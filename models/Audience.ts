import { Schema, model } from 'mongoose';

interface AdmPriceType {
  price: number;
  desc: string;
  date: Date;
}

const AdmPriceSchema = new Schema<AdmPriceType>({
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

module.exports = model('adm_price', AdmPriceSchema);
