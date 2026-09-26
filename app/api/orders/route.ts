import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    let userId = null;
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        userId = decoded.userId;
      } catch (err) {
        // invalid token, treat as guest
      }
    }

    const { items, totalAmount, shippingAddress, paymentMethod } = await req.json();

    if (!items || !totalAmount || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const order = await Order.create({
      user: userId, // Can be null for guests
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'CashOnDelivery' ? 'Pending' : 'Pending',
      orderStatus: 'Processing'
    });

    return NextResponse.json({ message: 'Order created successfully', orderId: order._id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
