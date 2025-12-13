import { exec } from "child_process";

const url = "https://www.youtube.com/watch?v=3dXTNMOrd9k";

const ytDlpPath = `"C:\\yt-dlp\\yt-dlp.exe"`;
const ffmpegPath = `"C:\\ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe"`;

exec(
  `${ytDlpPath} -x --audio-format mp3 --ffmpeg-location ${ffmpegPath} --output "%(title)s.%(ext)s" "${url}"`,
  (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error.message);
      return;
    }
    console.log(stdout);
    console.log("Descarga y conversión completadas");
  }
);
