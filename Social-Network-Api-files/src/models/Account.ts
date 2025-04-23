import { Schema, model, Types, Document } from 'mongoose';

export interface AccountDocument extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  totalFriends?: number; // virtual
}

const accountSchema = new Schema<AccountDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please provide a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post' // formerly 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Account' // self-reference
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Virtual to calculate friend count
accountSchema.virtual('totalFriends').get(function (this: AccountDocument) {
  return this.friends.length;
});

// Export model
export const AccountModel = model<AccountDocument>('Account', accountSchema);
