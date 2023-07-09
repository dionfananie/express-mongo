import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

interface QurbanType {
  qurban_id: string;
  name: string;
  qurban_type: string;
}
interface BuyerType extends Document {
  name: string;
  address: string;
  handphone: string;
  qurban: QurbanType;
  desc: string;
  has_paid: boolean;
  date: Date;
}

const QurbanSchema = new Schema<QurbanType>({
  qurban_id: String,
  name: String,
  qurban_type: String,
});

const BuyerSchema = new Schema<BuyerType>({
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

export default model<BuyerType>('List_Buyer', BuyerSchema);
