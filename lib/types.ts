// Product types
export interface ProductImage {
  url: string;
  angleLabel: string; // "front", "side", "top", "in-room"
}

export interface ProductVariant {
  label: string; // "13x13 cm"
  dimensions: {
    h: number;
    w: number;
    d?: number;
    unit: string;
  };
  sku: string;
  stock: number;
  priceOverride?: number;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  story?: string;
  materialNotes?: string;
  images: ProductImage[];
  videoUrl?: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  variants: ProductVariant[];
  category: string;
  categorySlug: string;
  roomTags: string[];
  ratingAvg: number;
  ratingCount: number;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  isNewArrival?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

// Order types
export type OrderStatus = 'pending_verification' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: string; // product ID
  title: string;
  image: string;
  variant?: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  zone: 'mirpur' | 'dhaka' | 'outside_dhaka';
  notes?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'bkash' | 'nagad';
  senderNumber: string;
  transactionId: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// Review types
export interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  adminReply?: string;
  createdAt: string;
}

// User types
export type UserRole = 'customer' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

// Banner types
export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  linkTarget: string;
  isActive: boolean;
  sortOrder: number;
  type: 'hero' | 'promo' | 'room';
}

// Category type
export interface Category {
  name: string;
  slug: string;
  image: string;
  description?: string;
  productCount: number;
}

// Room type
export interface Room {
  name: string;
  slug: string;
  image: string;
  description?: string;
}

// Delivery zones
export const DELIVERY_ZONES = {
  mirpur: { label: 'Inside Mirpur', charge: 60 },
  dhaka: { label: 'Rest of Dhaka', charge: 100 },
  outside_dhaka: { label: 'Outside Dhaka', charge: 150 },
} as const;

export const FREE_DELIVERY_THRESHOLD = 3000; // BDT
