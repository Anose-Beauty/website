import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

const PHONEPE_API_URL = process.env.PHONEPE_ENV === 'PROD'
    ? 'https://api.phonepe.com/apis/hermes/pg/v1/pay'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

export async function POST(request: Request) {
    try {
        const { cart, shippingInfo, userId, total } = await request.json();

        // Validate required fields
        if (!cart || !total) {
            return NextResponse.json(
                { error: 'Cart and total are required' },
                { status: 400 }
            );
        }

        const merchantId = process.env.PHONEPE_MERCHANT_ID;
        const saltKey = process.env.PHONEPE_SALT_KEY;
        const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        if (!merchantId || !saltKey || merchantId === 'your_merchant_id') {
            // PhonePe not configured - create order and return success for testing
            console.log('PhonePe not configured, creating test order');

            const order = await prisma.order.create({
                data: {
                    userId: userId || null,
                    total: total,
                    status: 'PENDING',
                    address: shippingInfo ? JSON.stringify(shippingInfo) : null,
                    items: {
                        create: cart.map((item: any) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price * item.quantity,
                        })),
                    },
                },
            });

            // For testing without PhonePe, redirect to success
            return NextResponse.json({
                success: true,
                redirectUrl: `/checkout/success?orderId=${order.id}`,
                orderId: order.id,
                message: 'PhonePe not configured - order created for testing',
            });
        }

        // Generate unique transaction ID
        const transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // Create order in database with pending status
        const order = await prisma.order.create({
            data: {
                userId: userId || null,
                total: total,
                status: 'PENDING',
                address: shippingInfo ? JSON.stringify(shippingInfo) : null,
                items: {
                    create: cart.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price * item.quantity,
                    })),
                },
            },
        });

        // PhonePe payload
        const payloadData = {
            merchantId: merchantId,
            merchantTransactionId: transactionId,
            merchantUserId: userId || `GUEST${Date.now()}`,
            amount: Math.round(total * 100), // Convert to paise
            redirectUrl: `${baseUrl}/api/payment/callback?orderId=${order.id}&transactionId=${transactionId}`,
            redirectMode: 'REDIRECT',
            callbackUrl: `${baseUrl}/api/payment/webhook`,
            paymentInstrument: {
                type: 'PAY_PAGE',
            },
        };

        // Encode payload to base64
        const base64Payload = Buffer.from(JSON.stringify(payloadData)).toString('base64');

        // Generate checksum
        const checksum = crypto
            .createHash('sha256')
            .update(base64Payload + '/pg/v1/pay' + saltKey)
            .digest('hex') + '###' + saltIndex;

        // Make request to PhonePe
        const response = await fetch(PHONEPE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
            },
            body: JSON.stringify({
                request: base64Payload,
            }),
        });

        const data = await response.json();

        console.log('PhonePe Response:', JSON.stringify(data, null, 2));

        if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
            return NextResponse.json({
                success: true,
                redirectUrl: data.data.instrumentResponse.redirectInfo.url,
                orderId: order.id,
                transactionId: transactionId,
            });
        } else {
            // Delete failed order
            await prisma.order.delete({
                where: { id: order.id },
            });

            return NextResponse.json(
                {
                    error: data.message || 'Payment initiation failed',
                    details: data
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Payment initiation error:', error);
        return NextResponse.json(
            { error: 'Failed to initiate payment' },
            { status: 500 }
        );
    }
}
