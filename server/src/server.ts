import express, { Request, Response, NextFunction } from "express";
import { config } from "./config.js";
import AppError from "./utils/globalErrorHandler.js";
import { ErrorWithStatus } from "./types/index.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import cors from "cors";
import geminiInteractor from "./interactor/gemini.js";
import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 8080 });

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors());
} else if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: ["https://api.example.com"],
    })
  );
}

app.use(express.json());
app.get("/api/test", (req: Request, res: Response) => {
  res.end("working");
});
app.post("/api/generatebasic", async (req: Request, res: Response) => {
  res.json(await geminiInteractor(req.body?.prompt));
});
app.post("/api/generateadvanced", async (req: Request, res: Response) => {
  console.log("here");
  const prompt = req.body.prompt;
  const a = await inngest.send({
    name: "test/hello.world",
    data: { prompt },
  });
  console.log("A is", a);
  res.json({ status: "Creating in Background", prompt });
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.post("/api/webhook/sandbox-ready", async (req, res) => {
  try {
    const payload = req.body;
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ url: payload.url }));
      }
    });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});
app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});
app.use(
  (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ?? 500;
    const status = err.status ?? "error";
    res.status(statusCode).json({
      status,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
);
const server = app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});

process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception! 💥", err);
  process.exit(1);
});
process.on("unhandledRejection", (err: any) => {
  console.error("Unhandled Rejection! 💥", err);
  server.close(() => {
    console.log("Server closed due to unhandled promise rejection");
    process.exit(1);
  });
});
