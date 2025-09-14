import dotenv from "dotenv";
dotenv.config();

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const config = {
  PORT: getEnvVar("PORT", "5000"),
  MONGO_URI: getEnvVar("MONGO_URI"),
  GEMINI_API_KEY: getEnvVar("GEMINI_API_KEY"),
};
