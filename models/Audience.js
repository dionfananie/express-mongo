const mongoose = require('mongoose');

const AdmPriceSchema = mongoose.Schema({
  price: {
    type: Number,
    require: true,
  },
  desc: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('adm_price', AdmPriceSchema);
