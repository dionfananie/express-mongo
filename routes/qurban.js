const express = require('express');
const router = express.Router();
const Qurban = require('../models/Qurban');
const QurbanType = require('../models/QurbanType');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const sanitizeObject = require('../helpers/sanitizeObject');

router.get('/', async (req, res) => {
  const { id, projection } = req.query;

  const trustedProjection = sanitizeObject(projection);
  try {
    let lists = [];
    if (id) lists = await Qurban.findById(id);
    else lists = await Qurban.find({}, trustedProjection);
    res.json(lists);
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

router.get('/type', async (req, res) => {
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

router.post('/update', async (req, res) => {
  const id = req.query.id || 0;
  const total = req.query.total || 0;
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

/**
 * function create qurban sapi
 */

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    const result = await cloudinary.uploader.upload(req.file.path);
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
    console.log(error);
  }
});

router.get('/delete', async (req, res) => {
  try {
    const id = req.query.id || 0;
    await Qurban.deleteOne({ _id: id });
    res.json({ is_success: 1, message: `Success delete Qurban data` });
  } catch (error) {
    console.log(error);
  }
});

router.post('/qurban-type', async (req, res) => {
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

module.exports = router;
