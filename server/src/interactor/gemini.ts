import { GoogleGenerativeAI } from "@google/generative-ai";
import { createBasicPrompt } from "../utils/prompt.js";
import { config } from "../config.js";
interface ResponseSchema {
  appName: string;
  entities: Record<
    string,
    {
      formFields: Array<{
        name: string;
        label: string;
        type: string;
        required: boolean;
        optionsSource?: string;
        options?: string[];
      }>;
    }
  >;
  roles: string[];
  features: string[];
  generatedUI: {
    menu: string[];
    forms: string[];
  };
}

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
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
    const rawResponse = JSON.parse(response.text());
    const normalizedResponse = {
      appName: rawResponse.appName || rawResponse.AppName || "",
      entities: normalizeEntities(
        rawResponse.entities || rawResponse.Entities || {}
      ),
      roles: rawResponse.roles || rawResponse.Roles || [],
      features: rawResponse.features || rawResponse.Features || [],
      generatedUI: {
        menu:
          rawResponse.generatedUI?.menu || rawResponse.GeneratedUI?.Menu || [],
        forms:
          rawResponse.generatedUI?.forms ||
          rawResponse.GeneratedUI?.Forms ||
          [],
      },
    };
    return normalizedResponse;
  } catch (error) {
    console.error("Error generating content:", error);
  }
};
function normalizeEntities(entities: any): ResponseSchema["entities"] {
  const normalized: ResponseSchema["entities"] = {};

  if (!entities || typeof entities !== "object") {
    return normalized;
  }

  for (const [entityKey, entityValue] of Object.entries(entities)) {
    // Trim the entity key to remove any whitespace
    const cleanKey = entityKey.trim();

    const formFields =
      (entityValue as any)?.FormFields || (entityValue as any)?.formFields;

    if (Array.isArray(formFields)) {
      normalized[cleanKey] = {
        formFields: formFields.map((field: any) => ({
          name: field.name || "",
          label: field.label || "",
          type: field.type || "text",
          required: field.required ?? false,
          ...(field.optionsSource && { optionsSource: field.optionsSource }),
          ...(field.options && { options: field.options }),
        })),
      };
    }
  }

  return normalized;
}
export default geminiInteractor;
