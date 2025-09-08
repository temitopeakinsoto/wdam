import React from "react";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
  isDeleting?: boolean;
}

export function PostCard({ post, onDelete, isDeleting }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow h-80 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base font-bold text-gray-900 flex-1 pr-2 line-clamp-2">
          {post.title}
        </h3>
        {onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 disabled:opacity-50"
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
          </button>
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
    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
      <button
        onClick={onClick}
        className="w-full h-72 flex flex-col items-center justify-center text-gray-500 hover:text-gray-600 transition-colors"
      >
        <svg
          className="w-8 h-8 mb-3"
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
        <span className="text-lg font-medium">New Post</span>
      </button>
    </div>
  );
}
