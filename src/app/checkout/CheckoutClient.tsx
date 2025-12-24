'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutClient() {
    const { cart, cartTotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    if (cart.length === 0) {
        return (
            <div className="checkout-block md:py-20 py-12">
                <div className="container mx-auto text-center">
                    <div className="heading3">Your cart is empty</div>
                    <p className="body1 text-secondary mt-4">You cannot checkout with an empty cart.</p>
                    <Link href="/shop" className="button-main bg-purple-600 text-white px-10 py-3 rounded-full inline-block mt-8 hover:bg-purple-700 duration-300">
                        Go To Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-block md:py-20 py-10">
            <div className="container mx-auto">
                <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                    <div className="lg:w-1/2 w-full lg:pr-10">
                        <div className="login bg-zinc-50 py-4 px-6 flex justify-between rounded-xl mb-8">
                            <div className="left flex items-center gap-2">
                                <span className="text-secondary">Already have an account?</span>
                                <Link href="/login" className="font-bold hover:underline">Login</Link>
                            </div>
                            <i className="ph ph-caret-down text-xl"></i>
                        </div>

                        <div className="information">
                            <div className="heading5 border-b border-line pb-4 mb-6">Shipping Information</div>
                            <form className="grid sm:grid-cols-2 gap-5">
                                <div className="col-span-1">
                                    <input className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black" type="text" placeholder="First Name *" required />
                                </div>
                                <div className="col-span-1">
                                    <input className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black" type="text" placeholder="Last Name *" required />
                                </div>
                                <div className="col-span-full">
                                    <input className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black" type="email" placeholder="Email Address *" required />
                                </div>
                                <div className="col-span-full">
                                    <input className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black" type="text" placeholder="Phone Number *" required />
                                </div>
                                <div className="col-span-full">
                                    <select className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black appearance-none bg-white">
                                        <option value="">Choose Country/Region</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <input className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black" type="text" placeholder="Town/City *" required />
                                </div>
                                <div className="col-span-1">
                                    <input className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black" type="text" placeholder="Postal Code *" required />
                                </div>
                                <div className="col-span-full">
                                    <textarea className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black h-32" placeholder="Street Address, Apartment, etc. *" required></textarea>
                                </div>
                                <div className="col-span-full">
                                    <textarea className="border border-line px-5 py-3 w-full rounded-xl focus:outline-none focus:border-black h-24" placeholder="Order Note (Optional)"></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="payment-block mt-12">
                            <div className="heading5 border-b border-line pb-4 mb-6">Payment Method</div>
                            <div className="list-payment flex flex-col gap-4">
                                <div className={`item border rounded-2xl p-5 cursor-pointer duration-300 ${paymentMethod === 'credit-card' ? 'border-black bg-zinc-50' : 'border-line hover:border-black'}`} onClick={() => setPaymentMethod('credit-card')}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'credit-card' ? 'border-black' : 'border-line'}`}>
                                            {paymentMethod === 'credit-card' && <div className="w-2.5 h-2.5 rounded-full bg-black"></div>}
                                        </div>
                                        <span className="font-bold">Credit/Debit Card</span>
                                    </div>
                                    {paymentMethod === 'credit-card' && (
                                        <div className="mt-5 grid grid-cols-2 gap-4">
                                            <input className="col-span-full border border-line px-4 py-2 rounded-lg" type="text" placeholder="Card Number" />
                                            <input className="col-span-1 border border-line px-4 py-2 rounded-lg" type="text" placeholder="MM/YY" />
                                            <input className="col-span-1 border border-line px-4 py-2 rounded-lg" type="text" placeholder="CVV" />
                                        </div>
                                    )}
                                </div>

                                <div className={`item border rounded-2xl p-5 cursor-pointer duration-300 ${paymentMethod === 'cod' ? 'border-black bg-zinc-50' : 'border-line hover:border-black'}`} onClick={() => setPaymentMethod('cod')}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-black' : 'border-line'}`}>
                                            {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-black"></div>}
                                        </div>
                                        <span className="font-bold">Cash on Delivery</span>
                                    </div>
                                    {paymentMethod === 'cod' && (
                                        <p className="mt-3 text-secondary text-sm">Pay with cash when your order is delivered to your doorstep.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button className="button-main w-full bg-purple-600 text-white py-4 rounded-xl mt-10 hover:bg-purple-700 duration-300 font-bold uppercase">
                            Place Order
                        </button>
                    </div>

                    <div className="lg:w-1/3 w-full">
                        <div className="order-summary bg-zinc-50 p-8 rounded-2xl sticky top-24">
                            <div className="heading5 border-b border-line pb-4 mb-6">Your Order</div>
                            <div className="list-product flex flex-col gap-5">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="item flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-20 relative rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold line-clamp-1">{item.name}</div>
                                                <div className="text-secondary text-xs mt-1">
                                                    Qty: {item.quantity} {item.selectedSize && `| Size: ${item.selectedSize}`}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="font-bold whitespace-nowrap">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-details border-t border-line mt-8 pt-6 flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <span className="text-secondary">Subtotal</span>
                                    <span className="font-bold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Shipping</span>
                                    <span className="font-bold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between border-t border-line mt-4 pt-4">
                                    <span className="heading5">Total</span>
                                    <span className="heading5">₹{cartTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
