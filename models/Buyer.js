const mongoose = require('mongoose');

const QurbanSchema = mongoose.Schema({
  qurban_id: String,
  name: String,
  qurban_type: String,
});

const BuyerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  handphone: {
    type: String,
    require: true,
  },
  qurban: {
    type: QurbanSchema,
    require: true,
  },
  desc: String,
  has_paid: {
    type: Boolean,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('List_Buyer', BuyerSchema);
