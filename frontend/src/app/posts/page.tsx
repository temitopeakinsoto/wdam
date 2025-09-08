"use client";

import React, { useState, Suspense, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePosts, useCreatePost, useDeletePost } from "@/hooks/usePosts";
import { NewPost } from "@/types";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { PostCard, NewPostCard } from "@/components/PostCard";
import { Modal } from "@/components/Modal";
import { PostForm } from "@/components/PostForm";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { Button } from "@/components/Button";
import Loader from "@/components/Loader";

// Loading component for Suspense fallback
function PostsLoading() {
  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
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
    <Suspense fallback={<PostsLoading />}>
      <PostsTable />
    </Suspense>
  );
}

function PostsTable() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");
  const userEmail = searchParams.get("userEmail");

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const { isPending, error, data: posts = [] } = usePosts(userId || undefined);
  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost();

  const sortedPosts = useMemo(() => {
    const uniquePosts = posts.filter(
      (post, index, self) => index === self.findIndex((p) => p.id === post.id)
    );
    return uniquePosts.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });
  }, [posts]);

  const handleShowNewPostForm = useCallback(() => {
    setShowNewPostForm(true);
  }, []);

  const handleCancelNewPost = useCallback(() => {
    setShowNewPostForm(false);
  }, []);

  const handleDeleteClick = useCallback((postId: string) => {
    setPostToDelete(postId);
    setShowDeleteConfirm(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!postToDelete) return;

    try {
      await deletePostMutation.mutateAsync(postToDelete);
      setShowDeleteConfirm(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }, [postToDelete, deletePostMutation]);

  const handleCreatePost = useCallback(
    async (newPost: NewPost) => {
      if (!userId) return;

      try {
        await createPostMutation.mutateAsync({
          ...newPost,
          user_id: userId,
        });
        setShowNewPostForm(false);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [userId, createPostMutation]
  );

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
            <EmptyState
              title="No user selected"
              linkText="Go back to users"
              linkHref="/users"
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
            <ErrorState
              title="Error loading posts"
              message={error.message}
              linkText="Go back to users"
              linkHref="/users"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="flex justify-center">
        <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/users">
              <Button variant="ghost" className="mb-4">
                ← Back to Users
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {userName || "User"}
            </h1>
            <p className="text-base text-gray-600 mb-4">
              {userEmail?.toLowerCase() || "No email"}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {isPending ? "Loading..." : `${posts.length} posts`}
              </p>
              <Button onClick={handleShowNewPostForm}>Create New Post</Button>
            </div>
          </div>

          {isPending ? (
            <div className="flex justify-center items-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map((post, index) => (
                <PostCard
                  key={`post-${post.id}-${index}`}
                  post={post}
                  onDelete={handleDeleteClick}
                  isDeleting={
                    deletePostMutation.isPending && postToDelete === post.id
                  }
                />
              ))}

              {sortedPosts.length === 0 && !isPending && (
                <div className="col-span-full">
                  <EmptyState
                    title="No posts yet"
                    message="This user hasn't created any posts yet. Create the first one!"
                  />
                </div>
              )}
            </div>
          )}

          {/* Modal for New Post Form */}
          <Modal
            isOpen={showNewPostForm}
            onClose={handleCancelNewPost}
            title="Create New Post"
          >
            <PostForm
              onSubmit={handleCreatePost}
              onCancel={handleCancelNewPost}
              isSubmitting={createPostMutation.isPending}
            />
          </Modal>

          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            isOpen={showDeleteConfirm}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            title="Delete Post"
            message="Are you sure you want to delete this post? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            isLoading={deletePostMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
