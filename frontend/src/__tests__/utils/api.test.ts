import { API_BASE_URL, API_ENDPOINTS } from '@/utils/api';

describe('API Configuration', () => {
  describe('API_BASE_URL', () => {
    it('should have correct base URL', () => {
      expect(API_BASE_URL).toBe('https://web2-production-8f8e.up.railway.app');
    });
  });

  describe('API_ENDPOINTS', () => {
    it('should have correct endpoint URLs', () => {
      expect(API_ENDPOINTS.USERS).toBe('https://web2-production-8f8e.up.railway.app/users');
      expect(API_ENDPOINTS.USERS_WITH_ADDRESSES).toBe('https://web2-production-8f8e.up.railway.app/users/with-addresses');
      expect(API_ENDPOINTS.USERS_COUNT).toBe('https://web2-production-8f8e.up.railway.app/users/count');
      expect(API_ENDPOINTS.POSTS).toBe('https://web2-production-8f8e.up.railway.app/posts');
    });

    it('should generate correct dynamic endpoints', () => {
      const postId = 'test-post-id';
      const userId = 'test-user-id';

      expect(API_ENDPOINTS.POST_BY_ID(postId)).toBe('https://web2-production-8f8e.up.railway.app/posts/test-post-id');
      expect(API_ENDPOINTS.POSTS_BY_USER(userId)).toBe('https://web2-production-8f8e.up.railway.app/posts?userId=test-user-id');
    });

    it('should handle special characters in dynamic endpoints', () => {
      const postId = 'post-with-special-chars!@#';
      const userId = 'user-with-special-chars!@#';

      expect(API_ENDPOINTS.POST_BY_ID(postId)).toBe('https://web2-production-8f8e.up.railway.app/posts/post-with-special-chars!@#');
      expect(API_ENDPOINTS.POSTS_BY_USER(userId)).toBe('https://web2-production-8f8e.up.railway.app/posts?userId=user-with-special-chars!@#');
    });
  });
});
