import { useState } from "react";

export default function LandingPage() {
  const [textValue, setTextValue] = useState("");
  const handleSubmit = () => {
    console.log("Textarea value:", textValue);
  };
  const handleKeyDown = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div
      className="
      w-full h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500 text-white
      flex items-center justify-center flex-col
      "
    >
      <h1 className="font-bold mb-0.5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight">
        Turn Ideas Into Apps
      </h1>
      <h2 className="font-bold mb-8 text-xl sm:text-xl md:text-xl lg:text-xl text-gray-900 dark:text-gray-200 leading-tight">
        Build any app in seconds — just describe what you want to create{" "}
      </h2>{" "}
      <div className="relative w-1/2">
        <textarea
          autoFocus
          value={textValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTextValue(e.target.value)}
          className="mt-0.5 w-full h-36 p-4 pb-14 text-2xl focus:outline-none resize-none focus:border-black rounded-2xl border-2 border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="absolute bottom-3 right-3 bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-1-1V5.414L5.707 8.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 01-1 1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
