import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  material: string;
  images: { url: string; angleLabel: string }[];
  videoUrl?: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  variants: {
    label: string; // e.g., "13x13 cm"
    dimensions: { h: number; w: number; d: number; unit: string };
    sku: string;
    stock: number;
    priceOverride?: number;
  }[];
  categorySlug: string;
  category: string;
  roomTags: string[];
  ratingAvg: number;
  ratingCount: number;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  isNewArrival: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    material: { type: String },
    images: [
      {
        url: { type: String, required: true },
        angleLabel: { type: String, required: true }, // 'front', 'side', 'in-room'
      }
    ],
    videoUrl: { type: String },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    discountPercent: { type: Number, default: 0 },
    variants: [
      {
        label: { type: String, required: true },
        dimensions: {
          h: { type: Number },
          w: { type: Number },
          d: { type: Number },
          unit: { type: String, default: 'cm' }
        },
        sku: { type: String },
        stock: { type: Number, required: true, default: 0 },
        priceOverride: { type: Number }
      }
    ],
    categorySlug: { type: String, required: true },
    category: { type: String, required: true },
    roomTags: [{ type: String }],
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isNewArrival: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Indexes for Text Search and quick filtering
ProductSchema.index({ title: 'text', description: 'text', category: 'text' });
ProductSchema.index({ categorySlug: 1 });
ProductSchema.index({ roomTags: 1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
