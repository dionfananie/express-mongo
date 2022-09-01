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
    if (id) lists = await Buyer.findById(id);
    if (qurbanId) lists = await Buyer.find({ qurbanId: qurbanId });
    else lists = await Buyer.find({}, trustedProjection);
    res.json(lists);
  } catch (error) {
    console.error(error);

    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    const id = req.body.id || 0;
    if (id) await Qurban.findOneAndUpdate({ _id: id }, { $inc: { quota: -1 } }, { new: true });
    const buyer = new Buyer({
      name: req.body.name,
      address: req.body.address,
      handphone: req.body.handphone,
      qurbanId: req.body.qurbanId,
      desc: req.body.description,
    });

    await buyer.save();
    res.json({ is_success: 1, message: `Success add Qurban's buyer` });
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

module.exports = router;
