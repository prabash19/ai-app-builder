import { useState } from "react";
import { config } from "../utils/config";

function Main() {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sendData = async (data: string) => {
    try {
      const response = await fetch(`${config.baseUrl}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: data }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("API Response:", result);
      return result;
    } catch (error) {
      console.error("Error sending prompt to backend:", error);
      throw error;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };
  const sendPromptToBackend = async (data: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      const result = await sendData(data);
      console.log("API Response:", result);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error in sendPromptToBackend:", error);
      setErrorMessage("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (prompt.trim()) {
      sendPromptToBackend(prompt);
      setPrompt("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          AI Prompt Generator
        </h1>
        <p className="text-sm text-center text-gray-400 mb-6">
          Enter your prompt below and press the button to submit.
        </p>
        <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full h-40 p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none font-inter"
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={handleInputChange}
          />
          {isLoading && (
            <div className="text-center text-blue-400 font-medium">
              Sending...
            </div>
          )}
          {isSuccess && (
            <div className="text-center text-green-400 font-medium">
              Success! Response received.
            </div>
          )}
          {errorMessage && (
            <div className="text-center text-red-400 font-medium">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className={`w-full px-6 py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Generate Response"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Main;
