const express = require('express');
const router = express.Router();
const Qurban = require('../models/Qurban');
const QurbanType = require('../models/QurbanType');

router.get('/qurban', async (req, res) => {
  const id = req.query.id || 0;
  try {
    let lists = [];
    if (id) lists = await Qurban.findById(id);
    else lists = await Qurban.find();
    res.json(lists);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/qurban', async (req, res) => {
  const qurban = new Qurban({
    name: req.body.name,
    weight: req.body.weight,
    type: req.body.type,
    price: req.body.price,
    desc: req.body.desc,
  });
  const savePost = await qurban.save();
  res.json(savePost);
});

router.post('/qurban-type', async (req, res) => {
  const qurban = new QurbanType({
    name: req.body.name,
    type: req.body.type,
  });
  const savePost = await qurban.save();
  res.json(savePost);
});

module.exports = router;