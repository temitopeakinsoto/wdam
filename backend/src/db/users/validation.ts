import { User } from "./types";

export const validateUser = (user: Partial<User>): boolean => {
  return !!(
    user.name &&
    user.username &&
    user.email &&
    user.phone &&
    typeof user.name === 'string' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string' &&
    typeof user.phone === 'string' &&
    user.name.trim().length > 0 &&
    user.username.trim().length > 0 &&
    user.email.trim().length > 0 &&
    user.phone.trim().length > 0 &&
    user.email.includes('@')
  );
};
