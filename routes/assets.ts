import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');

router.get('/', async (req: Request, res: Response) => {
  try {
    res.json({ text: 'hello' });
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

router.get('/delete', async (req: Request, res: Response) => {
  try {
    const id = req.query.id || 0;
    const { result } = await cloudinary.uploader.destroy(id);
    if (result === 'ok') {
      res.json({ is_success: 1, message: `Success delete assets` });
      return;
    }
    res.json({ is_success: 0, message: 'Failed delete assets' });
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
