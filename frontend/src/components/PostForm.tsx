"use client";
import React, { useState } from "react";
import { NewPost } from "@/types";
import { validatePostForm } from "@/utils/validation";
import { Button } from "./Button";

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
    <div className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label
          htmlFor="post-title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Post Title
        </label>
        <input
          id="post-title"
          type="text"
          placeholder="Enter post title..."
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="post-content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Post Content
        </label>
        <textarea
          id="post-content"
          rows={6}
          placeholder="Write your post content..."
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none text-sm"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}
