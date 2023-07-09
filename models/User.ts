import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';
const bcrypt = require('bcryptjs');

export interface IUser extends Document {
  email: string;
  name: string;
  hash_password: string;
  token?: string;
  date: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  hash_password: {
    type: String,
    required: true,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.hash_password);
};

export default model<IUser>('User', UserSchema);
