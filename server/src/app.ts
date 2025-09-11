import express from "express";

const app = express();

app.use(express.json());
app.get("/api", (req, res) => {
  res.end("working");
});

export default app;
