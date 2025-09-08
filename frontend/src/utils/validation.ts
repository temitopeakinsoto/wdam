import { NewPost } from '@/types';

/**
 * Validates post form data
 */
export function validatePostForm(post: NewPost): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!post.title.trim()) {
    errors.push('Title is required');
  }

  if (!post.content.trim()) {
    errors.push('Content is required');
  }

  if (post.title.trim().length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (post.content.trim().length > 1000) {
    errors.push('Content must be less than 1000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates user form data (for future use)
 */
export function validateUserForm(data: {
  name?: string;
  email?: string;
  phone?: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.name !== undefined && !data.name.trim()) {
    errors.push('Name is required');
  }

  if (data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (data.phone !== undefined && data.phone.trim() && !/^\+?[\d\s\-\(\)]+$/.test(data.phone)) {
    errors.push('Please enter a valid phone number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
