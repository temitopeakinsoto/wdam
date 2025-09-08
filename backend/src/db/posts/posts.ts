import { connection } from "../connection";
import { selectPostsTemplate, deletePostTemplate, selectPostByIdTemplate, createPostTemplate } from "./query-tamplates";
import { Post } from "./types";
import { randomUUID } from "crypto";





export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const getPostById = (postId: string): Promise<Post | null> =>
  new Promise((resolve, reject) => {
    connection.get<Post>(selectPostByIdTemplate, [postId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result || null);
      }
    });
  });

export const deletePost = (postId: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], function(error) {
      if (error) {
        reject(error);
      } else {
        // this.changes tells us how many rows were affected
        resolve(this.changes > 0);
      }
    });
  });

export const createPost = (post: Omit<Post, 'id' | 'created_at'>): Promise<string> =>
  new Promise((resolve, reject) => {
    const id = randomUUID();
    const created_at = new Date().toISOString();
    
    connection.run(
      createPostTemplate,
      [id, post.user_id, post.title, post.body, created_at],
      function(error) {
        if (error) {
          reject(error);
        } else {
          resolve(id);
        }
      }
    );
  });
