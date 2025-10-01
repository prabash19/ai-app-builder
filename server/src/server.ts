import express, { Request, Response, NextFunction } from "express";
import { config } from "./config.js";
import AppError from "./utils/globalErrorHandler.js";
import { ErrorWithStatus } from "./types/index.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import cors from "cors";
import geminiInteractor from "./interactor/gemini.js";

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
  const prompt = req.body.prompt;
  await inngest.send({
    name: "advancedGen",
    data: { prompt },
  });
  res.json({ status: "Creating in Background", prompt });
});
app.use("/api/inngest", serve({ client: inngest, functions }));
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
