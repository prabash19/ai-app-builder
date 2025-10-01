import { GoogleGenerativeAI } from "@google/generative-ai";
import { createBasicPrompt } from "../utils/prompt.js";
const genAI = new GoogleGenerativeAI("");
const geminiInteractor = async (prompt: string) => {
  const fullPrompt = createBasicPrompt(prompt);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });
  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

export default geminiInteractor;
