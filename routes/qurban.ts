import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Qurban = require('../models/Qurban');
const QurbanType = require('../models/QurbanType');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const sanitizeObject = require('../helpers/sanitizeObject');

router.get('/', async (req: Request, res: Response) => {
  const { id, projection } = req.query;

  const trustedProjection = sanitizeObject(projection);
  try {
    let lists = [];
    if (id) lists = await Qurban.findById(id);
    else lists = await Qurban.find({}, trustedProjection).sort({ date: -1 });
    res.json(lists);
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

/**
 * function create qurban sapi
 */

router.post('/', upload.single('image'), async (req: any, res: Response) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    const result = await cloudinary.uploader.upload(req.file.path, { use_filename: true, unique_filename: false });
    const qurban = new Qurban({
      image: { photos: result.secure_url || '', id: result.public_id || '' },
      name: req.body.name,
      weight: req.body.weight,
      qurban_type: req.body.qurban_type,
      price: req.body.price,
      desc: req.body.desc,
      quota: req.body.quota,
    });
    await qurban.save();
    res.json({ is_success: 1, message: `Success add Qurban data` });
  } catch (error) {
    console.error(error);
  }
});

router.put('/', async (req: Request, res: Response) => {
  const id = req.query.id || 0;
  const total = Number(req.query.total) || 0;
  try {
    let lists = [];
    if (id) lists = await Qurban.findOneAndUpdate({ _id: id }, { $inc: { quota: total * -1 } }, { new: true });
    else lists = await Qurban.find();
    res.json(lists);
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const id = req.query.id || 0;
    const qurban = await Qurban.findById(id);
    const { image } = qurban || {};
    const { deletedCount } = await Qurban.deleteOne({ _id: id });
    if (deletedCount > 0) {
      const { id: publicId } = image || {};
      if (publicId) {
        const { result } = await cloudinary.uploader.destroy(publicId);
        if (result === 'ok') {
          res.json({ is_success: 1, message: `Success delete Qurban data` });
          return;
        }
      }
      res.json({ is_success: 1, message: `Success delete Qurban data` });
      return;
    }
    res.json({ is_success: 0, message: `Failed delete Qurban data` });
  } catch (error) {
    console.error(error);
  }
});

/**
 * Function Qurban Type
 *
 */

router.post('/type', async (req: Request, res: Response) => {
  try {
    const qurban = new QurbanType({
      name: req.body.name,
      type: req.body.type,
    });
    await qurban.save();
    res.json({ is_success: 1, message: `Success add Qurban type` });
  } catch (error) {
    console.error(error);
  }
});

router.get('/type', async (req: Request, res: Response) => {
  const id = req.query.id || 0;
  try {
    let lists = [];
    if (id) lists = await QurbanType.findById(id);
    else lists = await QurbanType.find();
    res.json(lists);
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

router.delete('/type', async (req: Request, res: Response) => {
  try {
    const id = req.query.id || 0;
    const resp = await QurbanType.deleteOne({ _id: id });
    if (resp.deletedCount > 0) {
      res.json({ is_success: 1, message: `Success delete Tipe Qurban` });
      return;
    }
    res.json({ is_success: 0, message: `Failed delete Tipe Qurban` });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;