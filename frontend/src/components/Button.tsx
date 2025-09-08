import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}

const getVariantClasses = (variant: string) => {
  switch (variant) {
    case "destructive":
      return "bg-red-600 text-white hover:bg-red-700";
    case "outline":
      return "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
    case "secondary":
      return "bg-gray-100 text-gray-900 hover:bg-gray-200";
    case "ghost":
      return "text-gray-900 hover:bg-gray-100";
    case "link":
      return "text-blue-600 underline-offset-4 hover:underline";
    default:
      return "bg-black text-white hover:bg-gray-800";
  }
};

const getSizeClasses = (size: string) => {
  switch (size) {
    case "sm":
      return "h-8 px-3 py-1 text-xs";
    case "lg":
      return "h-12 px-8 py-3 text-base";
    case "icon":
      return "h-10 w-10 p-0";
    default:
      return "h-10 px-4 py-2 text-sm";
  }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);

    const combinedClasses =
      `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

    return (
      <button
        className={combinedClasses}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
