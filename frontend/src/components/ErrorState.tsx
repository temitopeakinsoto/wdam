import React from "react";
import Link from "next/link";
import { Button } from "./Button";

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
    <div className="min-h-[400px] flex justify-center items-center">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-red-600 mb-3">{title}</h1>
        {message && <p className="text-sm text-gray-600 mb-6">{message}</p>}
        <div className="flex justify-center space-x-3">
          {linkHref && (
            <Link href={linkHref}>
              <Button variant="outline">{linkText}</Button>
            </Link>
          )}
          {onRetry && <Button onClick={onRetry}>Try again</Button>}
        </div>
      </div>
    </div>
  );
}
