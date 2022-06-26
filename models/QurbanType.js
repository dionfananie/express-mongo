const mongoose = require('mongoose');

const QurbanTypeSchema = mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Qurban_Type', QurbanTypeSchema);
