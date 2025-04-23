import { Router } from 'express';
import accountRouter from './account-routes.js';
import postRouter from './post-routes.js';

const api = Router();

api.use('/accounts', accountRouter);
api.use('/posts', postRouter);

export default api;
