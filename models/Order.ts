import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId; // Optional guest? Let's say required.
  items: {
    product: mongoose.Types.ObjectId;
    variantLabel: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    zone: string;
  };
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'bKash' | 'Nagad';
  paymentSenderNumber: string;
  paymentTrxID: string;
  status: 'Pending Verification' | 'Paid / Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        variantLabel: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      }
    ],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      zone: { type: String, required: true },
    },
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['bKash', 'Nagad'], required: true },
    paymentSenderNumber: { type: String, required: true },
    paymentTrxID: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['Pending Verification', 'Paid / Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending Verification' 
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
