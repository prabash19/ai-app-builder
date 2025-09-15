import { useState } from "react";
import { config } from "../utils/config";

function ChatInterface() {
  const [prompt, setPrompt] = useState<string>("");
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
    try {
      const result = await sendData(data);
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error in sendPromptToBackend:", error);
    } finally {
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
    <form onSubmit={handlePromptSubmit}>
      <textarea
        placeholder="Type your prompt here..."
        value={prompt}
        onChange={handleInputChange}
        className="w-3/5 h-1/5 bg-red-200"
      />
      <button type="submit">start</button>
    </form>
  );
}

export default ChatInterface;
