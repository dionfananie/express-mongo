import { Schema, model } from 'mongoose';

interface QurbanType {
  image: { photos: string; id: string };
  name: string;
  weight: string;
  qurban_type: string;
  price: number;
  quota: number;
  desc: string;
  date: Date;
}

const QurbanSchema = new Schema<QurbanType>({
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

module.exports = model('List_Qurban', QurbanSchema);
