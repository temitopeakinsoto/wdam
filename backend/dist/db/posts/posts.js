"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.deletePost = exports.getPostById = exports.getPosts = void 0;
const connection_1 = require("../connection");
const query_tamplates_1 = require("./query-tamplates");
const crypto_1 = require("crypto");
const getPosts = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_tamplates_1.selectPostsTemplate, [userId], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getPosts = getPosts;
const getPostById = (postId) => new Promise((resolve, reject) => {
    connection_1.connection.get(query_tamplates_1.selectPostByIdTemplate, [postId], (error, result) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(result || null);
        }
    });
});
exports.getPostById = getPostById;
const deletePost = (postId) => new Promise((resolve, reject) => {
    connection_1.connection.run(query_tamplates_1.deletePostTemplate, [postId], function (error) {
        if (error) {
            reject(error);
        }
        else {
            // this.changes tells us how many rows were affected
            resolve(this.changes > 0);
        }
    });
});
exports.deletePost = deletePost;
const createPost = (post) => new Promise((resolve, reject) => {
    const id = (0, crypto_1.randomUUID)();
    const created_at = new Date().toISOString();
    connection_1.connection.run(query_tamplates_1.createPostTemplate, [id, post.user_id, post.title, post.body, created_at], function (error) {
        if (error) {
            reject(error);
        }
        else {
            resolve(id);
        }
    });
});
exports.createPost = createPost;
