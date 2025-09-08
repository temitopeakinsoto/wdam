import React from "react";
import Link from "next/link";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  message,
  linkText = "Go back",
  linkHref,
  action,
}: EmptyStateProps) {
  return (
    <div className="min-h-[400px] flex justify-center items-center">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-3">{title}</h1>
        {message && <p className="text-sm text-gray-600 mb-6">{message}</p>}
        <div className="space-x-4">
          {linkHref && (
            <Link href={linkHref}>
              <Button variant="outline">{linkText}</Button>
            </Link>
          )}
          {action}
        </div>
      </div>
    </div>
  );
}
