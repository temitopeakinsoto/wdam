"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../db/posts/posts");
const users_1 = require("../db/users/users");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.query.userId) === null || _a === void 0 ? void 0 : _a.toString();
    if (!userId) {
        res.status(400).send({ error: "userId is required" });
        return;
    }
    const posts = yield (0, posts_1.getPosts)(userId);
    res.send(posts);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, user_id } = req.body;
        // Validators
        if (!title || !body || !user_id) {
            res.status(400).json({ error: "Title, body, and user_id are required" });
            return;
        }
        if (typeof title !== 'string' || typeof body !== 'string' || typeof user_id !== 'string') {
            res.status(400).json({ error: "Title, body, and user_id must be strings" });
            return;
        }
        if (title.trim().length === 0 || body.trim().length === 0) {
            res.status(400).json({ error: "Title and body cannot be empty" });
            return;
        }
        // Check if user exists 
        const userExists = yield (0, users_1.getUserById)(user_id);
        if (!userExists) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        // Create the post
        const postId = yield (0, posts_1.createPost)({
            title: title.trim(),
            body: body.trim(),
            user_id
        });
        res.status(201).json({
            message: "Post created successfully",
            postId
        });
    }
    catch (error) {
        console.error("Error creating post:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: "Internal server error", message: errorMessage });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!postId) {
            res.status(400).json({ error: "Post ID is required" });
            return;
        }
        // checking to see if post exist
        const existingPost = yield (0, posts_1.getPostById)(postId);
        if (!existingPost) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        // Delete the post
        const deleted = yield (0, posts_1.deletePost)(postId);
        if (deleted) {
            res.status(200).json({ message: "Post deleted successfully" });
        }
        else {
            res.status(500).json({ error: "Failed to delete post" });
        }
    }
    catch (error) {
        console.error("Error deleting post:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: "Internal server error", message: errorMessage });
    }
}));
exports.default = router;
