import { getPosts, insertPost } from '../controllers/post';
import validateAuth from '../middleware/auth';
import { validatePostType } from '../middleware/post';
const express = require('express');
const router = express.Router();

router.get('/', getPosts);

router.post('/', validateAuth, validatePostType, insertPost);

export default router;
