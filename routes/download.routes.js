import express from "express";
import { spawn, exec } from "child_process";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const activeDownloads = new Map();
const completedDownloads = new Map();

router.post("/", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Debes enviar una URL" });

  const id = randomUUID();

  const ytDlpPath = process.env.YTDLP_PATH;
  const ffmpegPath = process.env.FFMPEG_PATH;
  const outputTemplate = path.join(os.homedir(), "Downloads", "%(title)s.%(ext)s");

  const args = [
    "-f", "bestaudio",
    "-x",
    "--audio-format", "mp3",
    "--audio-quality", "0",
    "--no-playlist",
    "--print", "after_move:filepath",
    "--ffmpeg-location", ffmpegPath,
    "--no-warnings",
    "--quiet",
    "-o", outputTemplate,
    url
  ];

  const startTime = Date.now();
  const ytProcess = spawn(ytDlpPath, args, { windowsHide: true });
  activeDownloads.set(id, ytProcess);

  let filePath = "";

  ytProcess.stdout.on("data", (data) => {
    filePath += data.toString();
  });

  ytProcess.on("close", () => {
    activeDownloads.delete(id);
    const tiempoMs = Date.now() - startTime;
    const tiempo = `${(tiempoMs / 1000).toFixed(2)} segundos`;

    if (!filePath.trim()) {
      completedDownloads.set(id, { completed: true, error: "Descarga cancelada", tiempo });
      return;
    }

    const realPath = filePath.trim();
    const fileName = path.basename(realPath);
    const ffmpegCmd = `"${ffmpegPath}" -i "${realPath}"`;

    exec(ffmpegCmd, (err, _, stderr) => {
      const match = stderr?.match(/bitrate:\s*(\d+)\s*kb\/s/i);
      const bitrate = match ? match[1] : "Desconocido";

      completedDownloads.set(id, {
        id,
        completed: true,
        message: "Descarga completada",
        archivo: fileName,
        ruta: realPath,
        bitrate: `${bitrate} kbps`,
        tiempo,
        tiempoMs
      });
    });
  });

  res.json({ id, message: "Descarga iniciada" });
});

router.post("/cancel/:id", (req, res) => {
  const { id } = req.params;
  const ytProcess = activeDownloads.get(id);
  if (!ytProcess) return res.status(404).json({ error: "Proceso no encontrado" });

  ytProcess.kill("SIGTERM");
  activeDownloads.delete(id);
  completedDownloads.set(id, { completed: true, error: "Descarga cancelada" });

  res.json({ message: "Descarga cancelada correctamente" });
});

router.get("/status/:id", (req, res) => {
  const { id } = req.params;

  const info = completedDownloads.get(id);
  if (info) return res.json(info);

  if (activeDownloads.has(id)) return res.json({ completed: false });

  return res.status(404).json({ error: "Proceso no encontrado" });
});

export default router;
