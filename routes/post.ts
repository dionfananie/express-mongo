import { validatePostType } from '../middleware/post';
import { getPosts, insertPost } from '../controllers/post';
const express = require('express');
const router = express.Router();

router.get('/', getPosts);
router.post('/', validatePostType(), insertPost);

export default router;
