import { Schema, model } from 'mongoose';

interface PostType {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const UserSchema = new Schema<PostType>({
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
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('User', UserSchema);
