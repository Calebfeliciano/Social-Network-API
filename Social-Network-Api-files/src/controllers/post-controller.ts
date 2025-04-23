import { Request, Response } from 'express';
import { PostModel } from '../models/Post.js';
import { AccountModel } from '../models/Account.js';

export const postController = {
  async getAllPosts(_: Request, res: Response) {
    try {
      const posts = await PostModel.find();
      return res.json(posts);
    } catch (err) {
      return res.status(500).json({ error: 'Could not fetch posts', details: err });
    }
  },

  async getPostById(req: Request, res: Response) {
    try {
      const post = await PostModel.findById(req.params.postId);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      return res.json(post);
    } catch (err) {
      return res.status(500).json({ error: 'Could not retrieve post', details: err });
    }
  },

  async createPost(req: Request, res: Response) {
    try {
      const newPost = await PostModel.create(req.body);
      await AccountModel.findByIdAndUpdate(req.body.userId, {
        $push: { thoughts: newPost._id }
      });
      return res.status(201).json(newPost);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to create post', details: err });
    }
  },

  async updatePost(req: Request, res: Response) {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.postId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

      return res.json(updatedPost);
    } catch (err) {
      return res.status(400).json({ error: 'Could not update post', details: err });
    }
  },

  async deletePost(req: Request, res: Response) {
    try {
      const deleted = await PostModel.findByIdAndDelete(req.params.postId);
      if (!deleted) return res.status(404).json({ message: 'Post not found' });

      await AccountModel.findOneAndUpdate(
        { thoughts: req.params.postId },
        { $pull: { thoughts: req.params.postId } }
      );

      return res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete post', details: err });
    }
  },

  async addComment(req: Request, res: Response) {
    try {
      const updated = await PostModel.findByIdAndUpdate(
        req.params.postId,
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!updated) return res.status(404).json({ message: 'Post not found' });

      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ error: 'Could not add comment', details: err });
    }
  },

  async removeComment(req: Request, res: Response) {
    try {
      const updated = await PostModel.findByIdAndUpdate(
        req.params.postId,
        { $pull: { reactions: { reactionId: req.params.commentId } } },
        { new: true }
      );

      if (!updated) return res.status(404).json({ message: 'Post not found' });

      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ error: 'Could not delete comment', details: err });
    }
  }
};
