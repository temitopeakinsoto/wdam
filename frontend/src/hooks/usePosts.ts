import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Post, NewPost } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';


export function usePosts(userId?: string) {
  return useQuery<Post[]>({
    queryKey: ['posts', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      
      const response = await fetch(API_ENDPOINTS.POSTS_BY_USER(userId));
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    },
    enabled: !!userId, 
  });
}


export function useAllPosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.POSTS);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    },
  });
}


export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: NewPost & { user_id: string }) => {
      const response = await fetch(API_ENDPOINTS.POSTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title.trim(),
          body: postData.content.trim(),
          user_id: postData.user_id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch posts for the specific user
      queryClient.invalidateQueries({ queryKey: ['posts', variables.user_id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}


export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, postData }: { id: string; postData: Partial<Post> }) => {
      const response = await fetch(API_ENDPOINTS.POST_BY_ID(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      return response.json();
    },
    onSuccess: (_) => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

/**
 * Hook to delete a post
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(API_ENDPOINTS.POST_BY_ID(postId), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch all posts queries
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
