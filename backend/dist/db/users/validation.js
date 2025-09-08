"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (user) => {
    return !!(user.name &&
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
        user.email.includes('@'));
};
exports.validateUser = validateUser;
