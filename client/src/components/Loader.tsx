interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
  message = "Loading, please wait...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-20 w-20", // Adjusted medium size for balance
    lg: "h-32 w-32",
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white bg-opacity-70">
      <div
        className={`
          ${sizeClasses[size]}
          border-4
          border-blue-500
          border-t-transparent
          rounded-full
          animate-spin
          ${className}
        `}
        role="status"
        aria-label="Loading"
      />
      <span className="mt-8 text-lg text-blue-700 font-semibold">
        {message}
      </span>
    </div>
  );
}
