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

    const { orderId, trxId } = await req.json();

    if (!orderId || !trxId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const orderQuery: any = { _id: orderId };
    if (userId) {
      orderQuery.user = userId;
    }
    const order = await Order.findOne(orderQuery);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    // Mock validation of TrxID (In real life, call bKash/Nagad API)
    if (trxId.length < 8) {
      return NextResponse.json({ message: 'Invalid TrxID' }, { status: 400 });
    }

    order.trxId = trxId;
    order.paymentStatus = 'Verified';
    await order.save();

    // Here we could trigger a websocket event to notify admin
    try {
      // Very simple local fetch to trigger socket.io broadcast if we had a dedicated endpoint
      // Or if we connect to the same server, we could emit.
    } catch (e) {
      console.log('Socket notification failed', e);
    }

    return NextResponse.json({ message: 'Payment verified successfully', order }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
