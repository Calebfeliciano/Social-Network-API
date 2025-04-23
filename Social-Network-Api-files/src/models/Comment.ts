import { Schema, Types, Document } from 'mongoose';
import { formatTimestamp } from '../utils/formatDate.js';

export interface CommentData extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export const commentSchema = new Schema<CommentData>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatTimestamp as any // ✅ key fix
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
