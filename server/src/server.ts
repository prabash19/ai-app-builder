import express, { Request, Response, NextFunction } from "express";
import { config } from "./config.js";
import AppError from "./utils/globalErrorHandler.js";
import { ErrorWithStatus } from "./types/index.js";
import createPrompt from "./utils/prompt.js";
import axios from "axios";

const app = express();
app.use(express.json());

app.get("/api/test", (req: Request, res: Response) => {
  res.end("working");
});
app.post("/api/generate", async (req: Request, res: Response) => {
  const incomingData: string = req.body?.prompt;
  if (!incomingData) {
    return res.status(400).json({ error: "No user prompt provided." });
  }
  const fullPrompt = createPrompt(incomingData);
  console.log("Full prompt being sent:", fullPrompt);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: fullPrompt,
        max_tokens: 256,
        temperature: 0.2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error calling the API:", error);
    res
      .status(500)
      .json({ error: "Failed to generate response from the LLM." });
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
