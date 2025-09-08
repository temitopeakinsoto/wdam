"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePosts, useCreatePost, useDeletePost } from "@/hooks/usePosts";
import { NewPost } from "@/types";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { PostCard, NewPostCard } from "@/components/PostCard";
import { Modal } from "@/components/Modal";
import { PostForm } from "@/components/PostForm";
import Loader from "@/components/Loader";

const queryClient = new QueryClient();

// Loading component for Suspense fallback
function PostsLoading() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      </div>
    </div>
  );
}

export default function PostPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PostsLoading />}>
        <PostsTable />
      </Suspense>
    </QueryClientProvider>
  );
}

function PostsTable() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");
  const userEmail = searchParams.get("userEmail");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // Use custom hooks for data fetching and mutations
  const { isPending, error, data: posts = [] } = usePosts(userId || undefined);
  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost();

  if (!userId) {
    return (
      <EmptyState
        title="No user selected"
        linkText="Go back to users"
        linkHref="/users"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Error loading posts"
        message={error.message}
        linkText="Go back to users"
        linkHref="/users"
      />
    );
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostMutation.mutateAsync(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCreatePost = async (newPost: NewPost) => {
    try {
      await createPostMutation.mutateAsync({
        ...newPost,
        user_id: userId,
      });
      setShowNewPostForm(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleCancelNewPost = () => {
    setShowNewPostForm(false);
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/users"
          className="flex items-center mb-6 transition-colors"
        >
          &larr; Back to Users
        </Link>

        <div className="bg-white mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {userName || "User"}
          </h1>
          <p className="text-gray-600 mb-2 text-sm">
            {userEmail?.toLowerCase() || "No email"} •{" "}
            {isPending ? "Loading..." : `${posts.length} posts`}
          </p>
        </div>

        {isPending ? (
          <div className="flex justify-center items-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            <NewPostCard onClick={() => setShowNewPostForm(true)} />

            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
                isDeleting={deletePostMutation.isPending}
              />
            ))}
          </div>
        )}

        {/* Modal for New Post Form */}
        <Modal
          isOpen={showNewPostForm}
          onClose={handleCancelNewPost}
          title="New Post"
        >
          <PostForm
            onSubmit={handleCreatePost}
            onCancel={handleCancelNewPost}
            isSubmitting={createPostMutation.isPending}
          />
        </Modal>
      </div>
    </div>
  );
}
