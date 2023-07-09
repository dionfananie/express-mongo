import { deleteBuyer, getAllBuyer, postBuyer, updatePaid } from '../controllers/buyer';

const express = require('express');

const router = express.Router();

router.get('/', getAllBuyer);

router.post('/', postBuyer);

router.put('/update/paid', updatePaid);

router.delete('/', deleteBuyer);

export default router;
