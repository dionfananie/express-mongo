const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');
const Qurban = require('../models/Qurban');

router.get('/', async (req, res) => {
  const id = req.query.id || 0;
  const qurbanId = req.query.qurbanId || 0;
  try {
    let lists = [];
    if (id) lists = await Buyer.findById(id);
    if (qurbanId) lists = await Buyer.find({ qurbanId: qurbanId });
    else lists = await Buyer.find();
    res.json(lists);
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = req.query.id || 0;
    if (id) await Qurban.findOneAndUpdate({ _id: id }, { $inc: { quota: -1 } }, { new: true });
    const buyer = new Buyer({
      name: req.body.name,
      address: req.body.address,
      handphone: req.body.handphone,
      qurbanId: req.body.qurbanId,
      desc: req.body.desc,
    });
    const savePost = await buyer.save();
    res.json(savePost);
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

module.exports = router;
