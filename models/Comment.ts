import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number; // 1-5
  text?: string;
  adminReply?: string;
  isVerifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String },
    adminReply: { type: String },
    isVerifiedPurchase: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// We often query comments by product, sorted by newest
CommentSchema.index({ product: 1, createdAt: -1 });

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
