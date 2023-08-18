import { validateQurbanType } from '../middleware/qurban';
import {
  addQurban,
  deleteQurban,
  deleteType,
  getAllQurban,
  getType,
  postType,
  updateQurban,
} from '../controllers/qurban';
import { qurbanTypeSchema } from '../schemas/qurban';


const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

router.get('/', getAllQurban);

/**
 * function create qurban sapi
 */

router.post('/', upload.single('image'), addQurban);
router.put('/', updateQurban);
router.delete('/', deleteQurban);

/**
 * Function Qurban Type
 *
 */
router.post('/type', postType);
router.get('/type', validateQurbanType(qurbanTypeSchema), getType);
router.delete('/type', deleteType);

export default router;
