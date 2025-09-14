import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config.js";
import createPrompt from "../utils/prompt.js";
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const geminiInteractor = async (prompt: string) => {
  const fullPrompt = createPrompt(prompt);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

export default geminiInteractor;
