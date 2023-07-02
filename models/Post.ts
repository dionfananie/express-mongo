import { Schema, model } from 'mongoose';

interface PostType {
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

module.exports = model('Post', PostSchema);
