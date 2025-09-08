"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostTemplate = exports.selectPostByIdTemplate = exports.deletePostTemplate = exports.selectPostsTemplate = void 0;
exports.selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;
exports.deletePostTemplate = `
DELETE FROM posts
WHERE id = ?
`;
exports.selectPostByIdTemplate = `
SELECT *
FROM posts
WHERE id = ?
LIMIT 1
`;
exports.createPostTemplate = `
INSERT INTO posts (id, user_id, title, body, created_at)
VALUES (?, ?, ?, ?, ?)
`;
