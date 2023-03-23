const express = require('express');
const sanitizeObject = require('../helpers/sanitizeObject');
const router = express.Router();
const Buyer = require('../models/Buyer');
const Qurban = require('../models/Qurban');

router.get('/', async (req, res) => {
  const { id, qurbanId, projection } = req.query;
  const trustedProjection = sanitizeObject(projection);
  try {
    let lists = [];
    if (id) lists = await Buyer.findById(id).sort({ date: -1 });
    if (qurbanId) lists = await Buyer.find({ qurbanId: qurbanId }).sort({ date: -1 });
    else lists = await Buyer.find({}, trustedProjection).sort({ date: -1 });
    res.json(lists);
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = req.body.id || 0;
    const buyer = new Buyer({
      name: req.body.name,
      address: req.body.address,
      handphone: req.body.handphone,
      qurbanId: req.body.qurbanId,
      desc: req.body.description,
    });

    const resp = await buyer.save();
    if (id && resp.name) await Qurban.findOneAndUpdate({ _id: id }, { $inc: { quota: -1 } }, { new: true });
    res.json({ is_success: 1, message: `Success add Qurban's buyer` });
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

module.exports = router;
