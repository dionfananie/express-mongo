const mongoose = require('mongoose');

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
  qurbanId: {
    type: String,
  },
  desc: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('List_Buyer', BuyerSchema);
