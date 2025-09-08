import React from "react";
import { Post } from "@/types";
import { Button } from "./Button";

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
  isDeleting?: boolean;
}

export function PostCard({ post, onDelete, isDeleting }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow min-h-[320px] flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-3 line-clamp-2 leading-6">
          {post.title}
        </h3>
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 h-8 w-8"
            title="Delete post"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        )}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed flex-1 overflow-hidden">
        {post.body}
      </p>
    </div>
  );
}

interface NewPostCardProps {
  onClick: () => void;
}

export function NewPostCard({ onClick }: NewPostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors min-h-[320px]">
      <Button
        variant="ghost"
        onClick={onClick}
        className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-600 border-none"
      >
        <svg
          className="w-10 h-10 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={2}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v8m4-4H8"
          />
        </svg>
        <span className="text-base font-medium">Create New Post</span>
      </Button>
    </div>
  );
}
