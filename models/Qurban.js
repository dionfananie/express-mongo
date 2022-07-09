const mongoose = require('mongoose');

const QurbanSchema = mongoose.Schema({
  image: {
    photos: String,
    id: String,
  },
  name: {
    type: String,
    require: true,
  },
  weight: {
    type: String,
  },
  qurban_type: {
    type: String,
  },
  price: {
    type: Number,
  },
  quota: {
    type: Number,
  },
  desc: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('List_Qurban', QurbanSchema);
