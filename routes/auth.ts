const express = require('express');
import { signIn, signUp } from '../controllers/auth';
import { validateSignUpType } from '../middleware/auth';
const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', validateSignUpType, signUp);

export default router;
