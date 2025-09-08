import { Router, Request, Response } from "express";
import { getPosts, getPostById, deletePost, createPost } from "../db/posts/posts";
import { getUserById } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.post("/", async (req: Request, res: Response) => {
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
    const userExists = await getUserById(user_id);
    if (!userExists) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    // Create the post
    const postId = await createPost({ 
      title: title.trim(), 
      body: body.trim(), 
      user_id 
    });
    
    res.status(201).json({ 
      message: "Post created successfully", 
      postId 
    });
  } catch (error) {
    console.error("Error creating post:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: "Internal server error", message: errorMessage });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    
    if (!postId) {
      res.status(400).json({ error: "Post ID is required" });
      return;
    }

    // checking to see if post exist
    const existingPost = await getPostById(postId);
    if (!existingPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    // Delete the post
    const deleted = await deletePost(postId);
    
    if (deleted) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(500).json({ error: "Failed to delete post" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: "Internal server error", message: errorMessage });
  }
});

export default router;
