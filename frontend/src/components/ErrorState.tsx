import React from "react";
import Link from "next/link";

interface ErrorStateProps {
  title: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title,
  message,
  linkText = "Go back",
  linkHref,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-xl font-medium text-red-600 mb-2">{title}</h1>
        {message && <p className="text-gray-600 mb-4">{message}</p>}
        <div className="space-x-4">
          {linkHref && (
            <Link href={linkHref} className="text-gray-600 hover:text-gray-800">
              {linkText}
            </Link>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-blue-600 hover:text-blue-800 ml-4"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
