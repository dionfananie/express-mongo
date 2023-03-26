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
    const { name, address, handphone, qurban, description } = req.body || {};
    const parsedQurban = JSON.parse(qurban);
    const qurbanId = parsedQurban.qurban_id;
    const buyer = new Buyer({
      name: name,
      address: address,
      handphone: handphone,
      qurban: parsedQurban,
      desc: description,
    });

    const resp = await buyer.save();
    if (qurbanId && resp.name) {
      await Qurban.findByIdAndUpdate(qurbanId, { $inc: { quota: -1 } }, { new: true });
    }
    res.json({ is_success: 1, message: `Success add Qurban's buyer` });
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

router.get('/delete', async (req, res) => {
  try {
    const id = req.query.id || 0;
    if (!id) {
      res.json({ is_success: 0, message: `Need Id` });
      return;
    }
    const resp = await Buyer.deleteOne({ _id: id });
    if (resp.deletedCount > 0) {
      res.json({ is_success: 1, message: `Success delete Buyer data` });
      return;
    }
    res.json({ is_success: 0, message: `Failed delete Buyer data` });
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

module.exports = router;
