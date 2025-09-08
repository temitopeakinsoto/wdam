import React from "react";
import Link from "next/link";

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
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-xl font-medium text-gray-900 mb-2">{title}</h1>
        {message && <p className="text-gray-600 mb-4">{message}</p>}
        <div className="space-x-4">
          {linkHref && (
            <Link href={linkHref} className="text-gray-600 hover:text-gray-800">
              {linkText}
            </Link>
          )}
          {action}
        </div>
      </div>
    </div>
  );
}
