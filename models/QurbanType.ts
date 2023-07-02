import { Schema, model } from 'mongoose';

interface QurbanTypeType {
  type: string;
  name: string;
  date: Date;
}

const QurbanTypeSchema = new Schema<QurbanTypeType>({
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

module.exports = model('Qurban_Type', QurbanTypeSchema);
