import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

interface PostType extends Document {
  title: string;
  desc: string;
  date: Date;
}

const PostSchema = new Schema<PostType>({
  title: {
    type: String,
    require: true,
  },
  desc: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model<PostType>('Post', PostSchema);
