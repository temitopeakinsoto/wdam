import { validatePostForm, validateUserForm } from '@/utils/validation';

describe('Validation Utilities', () => {
  describe('validatePostForm', () => {
    it('should pass validation for valid post', () => {
      const validPost = {
        title: 'Valid Title',
        content: 'Valid content that is not empty',
      };

      const result = validatePostForm(validPost);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should fail validation for empty title', () => {
      const invalidPost = {
        title: '',
        content: 'Valid content',
      };

      const result = validatePostForm(invalidPost);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should fail validation for whitespace-only title', () => {
      const invalidPost = {
        title: '   ',
        content: 'Valid content',
      };

      const result = validatePostForm(invalidPost);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should fail validation for empty content', () => {
      const invalidPost = {
        title: 'Valid Title',
        content: '',
      };

      const result = validatePostForm(invalidPost);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Content is required');
    });

    it('should fail validation for whitespace-only content', () => {
      const invalidPost = {
        title: 'Valid Title',
        content: '   ',
      };

      const result = validatePostForm(invalidPost);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Content is required');
    });

    it('should fail validation for title too long', () => {
      const invalidPost = {
        title: 'a'.repeat(101), // 101 characters
        content: 'Valid content',
      };

      const result = validatePostForm(invalidPost);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be less than 100 characters');
    });

    it('should fail validation for content too long', () => {
      const invalidPost = {
        title: 'Valid Title',
        content: 'a'.repeat(1001), // 1001 characters
      };

      const result = validatePostForm(invalidPost);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Content must be less than 1000 characters');
    });

    it('should collect multiple validation errors', () => {
      const invalidPost = {
        title: '',
        content: '',
      };

      const result = validatePostForm(invalidPost);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain('Title is required');
      expect(result.errors).toContain('Content is required');
    });
  });

  describe('validateUserForm', () => {
    it('should pass validation for valid user data', () => {
      const validUser = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-234-567-8900',
      };

      const result = validateUserForm(validUser);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should fail validation for empty name', () => {
      const invalidUser = {
        name: '',
        email: 'john@example.com',
      };

      const result = validateUserForm(invalidUser);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name is required');
    });

    it('should fail validation for whitespace-only name', () => {
      const invalidUser = {
        name: '   ',
        email: 'john@example.com',
      };

      const result = validateUserForm(invalidUser);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name is required');
    });

    it('should fail validation for invalid email', () => {
      const invalidUser = {
        name: 'John Doe',
        email: 'invalid-email',
      };

      const result = validateUserForm(invalidUser);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please enter a valid email address');
    });

    it('should pass validation for valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'user123@sub.domain.org',
      ];

      validEmails.forEach((email) => {
        const result = validateUserForm({ email });
        expect(result.isValid).toBe(true);
      });
    });

    it('should fail validation for invalid phone numbers', () => {
      const invalidUser = {
        name: 'John Doe',
        phone: 'invalid-phone',
      };

      const result = validateUserForm(invalidUser);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please enter a valid phone number');
    });

    it('should pass validation for valid phone formats', () => {
      const validPhones = [
        '+1-234-567-8900',
        '(555) 123-4567',
        '555 123 4567',
        '5551234567',
        '+44 20 7946 0958',
        '123-456-7890',
        '(123) 456-7890',
      ];

      validPhones.forEach((phone) => {
        const result = validateUserForm({ phone });
        expect(result.isValid).toBe(true);
      });
    });

    it('should skip validation for undefined fields', () => {
      const result = validateUserForm({});
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should collect multiple validation errors', () => {
      const invalidUser = {
        name: '',
        email: 'invalid-email',
        phone: 'invalid-phone',
      };

      const result = validateUserForm(invalidUser);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });
  });
});
