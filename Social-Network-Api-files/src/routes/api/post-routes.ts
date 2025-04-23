import { Router } from 'express';
import { postController } from '../../controllers/post-controller.js';

const postRouter = Router();

// /api/posts
postRouter.route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

// /api/posts/:postId
postRouter.route('/:postId')
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost);

// /api/posts/:postId/comments
postRouter.route('/:postId/comments')
  .post(postController.addComment);

// /api/posts/:postId/comments/:commentId
postRouter.route('/:postId/comments/:commentId')
  .delete(postController.removeComment);

export default postRouter;

