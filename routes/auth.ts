const express = require('express');
import { signIn, signUp } from '../controllers/auth';
const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;