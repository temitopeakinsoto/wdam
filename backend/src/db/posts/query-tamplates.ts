export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const deletePostTemplate = `
DELETE FROM posts
WHERE id = ?
`;

export const selectPostByIdTemplate = `
SELECT *
FROM posts
WHERE id = ?
LIMIT 1
`;

export const createPostTemplate = `
INSERT INTO posts (id, user_id, title, body, created_at)
VALUES (?, ?, ?, ?, ?)
`;