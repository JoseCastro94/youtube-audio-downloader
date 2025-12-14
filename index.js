import express from "express";
import cors from "cors";
import downloadRoutes from "./routes/download.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}`;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.use("/api/download", downloadRoutes);

app.listen(PORT, () => {
  console.log(`API corriendo en ${API_BASE_URL}`);
});
