import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

interface QurbanTypeType extends Document {
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

export default model<QurbanTypeType>('Qurban_Type', QurbanTypeSchema);
