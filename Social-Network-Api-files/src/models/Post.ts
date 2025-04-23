import { Schema, model, Types, Document } from 'mongoose';
import { commentSchema, CommentData } from './Comment.js'; 
import { formatTimestamp } from '../utils/formatDate.js';

export interface PostDocument extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<CommentData>;
  reactionTotal?: number;
}

const postSchema = new Schema<PostDocument>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatTimestamp as any
    },
    username: {
      type: String,
      required: true
    },
    reactions: [commentSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

postSchema.virtual('reactionTotal').get(function (this: PostDocument) {
  return this.reactions.length;
});

export const PostModel = model<PostDocument>('Post', postSchema);
