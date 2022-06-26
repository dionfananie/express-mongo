const mongoose = require('mongoose');

const QurbanSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  weight: {
    type: String,
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
  },
  desc: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('List_Qurban', QurbanSchema);
