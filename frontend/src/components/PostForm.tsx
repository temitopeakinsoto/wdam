import React, { useState } from "react";
import { NewPost } from "@/types";
import { validatePostForm } from "@/utils/validation";

interface PostFormProps {
  onSubmit: (post: NewPost) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: NewPost;
}

export function PostForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialData = { title: "", content: "" },
}: PostFormProps) {
  const [post, setPost] = useState<NewPost>(initialData);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const validation = validatePostForm(post);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    onSubmit(post);
  };

  const handleCancel = () => {
    setPost({ title: "", content: "" });
    setErrors([]);
    onCancel();
  };

  const isValid = post.title.trim() && post.content.trim();

  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <ul className="text-sm text-red-600 list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label
          htmlFor="post-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Post Title
        </label>
        <input
          id="post-title"
          type="text"
          placeholder="Enter post title..."
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="post-content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Post Content
        </label>
        <textarea
          id="post-content"
          rows={6}
          placeholder="Write your post content..."
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="px-4 py-2 border border-transparent text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          <span>{isSubmitting ? "Publishing..." : "Publish"}</span>
        </button>
      </div>
    </div>
  );
}
