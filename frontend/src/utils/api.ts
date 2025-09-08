export const API_BASE_URL = 'https://web2-production-8f8e.up.railway.app';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  USERS_WITH_ADDRESSES: `${API_BASE_URL}/users/with-addresses`,
  USERS_COUNT: `${API_BASE_URL}/users/count`,
  POSTS: `${API_BASE_URL}/posts`,
  POST_BY_ID: (id: string) => `${API_BASE_URL}/posts/${id}`,
  POSTS_BY_USER: (userId: string) => `${API_BASE_URL}/posts?userId=${userId}`,
} as const;
