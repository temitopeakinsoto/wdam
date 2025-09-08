import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, UsersCount } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';

/**
 * Hook to fetch all users with their addresses
 */
export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['usersData'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.USERS_WITH_ADDRESSES);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
  });
}

/**
 * Hook to fetch users count
 */
export function useUsersCount() {
  return useQuery<UsersCount>({
    queryKey: ['usersCount'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.USERS_COUNT);
      if (!response.ok) {
        throw new Error('Failed to fetch users count');
      }
      return response.json();
    },
  });
}

/**
 * Hook to create a new user (for future use)
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const response = await fetch(API_ENDPOINTS.USERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users data
      queryClient.invalidateQueries({ queryKey: ['usersData'] });
      queryClient.invalidateQueries({ queryKey: ['usersCount'] });
    },
  });
}

/**
 * Hook to update a user (for future use)
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, userData }: { id: string; userData: Partial<User> }) => {
      const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users data
      queryClient.invalidateQueries({ queryKey: ['usersData'] });
    },
  });
}

/**
 * Hook to delete a user (for future use)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`${API_ENDPOINTS.USERS}/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users data
      queryClient.invalidateQueries({ queryKey: ['usersData'] });
      queryClient.invalidateQueries({ queryKey: ['usersCount'] });
    },
  });
}
