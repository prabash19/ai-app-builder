import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config.js";
import createPrompt from "../utils/prompt.js";
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

const geminiInteractor = async (prompt: string) => {
  const fullPrompt = createPrompt(prompt);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });
  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    console.log("res is", JSON.parse(response.text()));
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

export default geminiInteractor;
