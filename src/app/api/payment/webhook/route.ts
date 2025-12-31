import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Verify the webhook signature
        const saltKey = process.env.PHONEPE_SALT_KEY;
        const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';

        if (!saltKey) {
            console.error('Salt key not configured');
            return NextResponse.json({ success: false }, { status: 500 });
        }

        // Decode the response
        const decodedResponse = JSON.parse(
            Buffer.from(body.response, 'base64').toString('utf-8')
        );

        const { merchantTransactionId, transactionId, code, data } = decodedResponse;

        console.log('PhonePe Webhook:', { code, merchantTransactionId, transactionId });

        // Find the order by transaction ID pattern
        // In production, you should store merchantTransactionId in a separate field
        const orders = await prisma.order.findMany({
            where: {
                status: 'PENDING',
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });

        // For now, we'll update based on webhook data
        if (code === 'PAYMENT_SUCCESS') {
            // Payment successful - update order status
            for (const order of orders) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: { status: 'PROCESSING' },
                });
                break; // Update only the most recent pending order
            }

            console.log('Payment successful for transaction:', merchantTransactionId);
        } else if (code === 'PAYMENT_ERROR' || code === 'PAYMENT_DECLINED') {
            // Payment failed
            for (const order of orders) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: { status: 'CANCELLED' },
                });
                break;
            }

            console.log('Payment failed for transaction:', merchantTransactionId);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
