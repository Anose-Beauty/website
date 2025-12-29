'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPopup() {
    const { isPopupOpen, closePopup, lastAddedItem } = useCart();

    if (!isPopupOpen || !lastAddedItem) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={closePopup}></div>
            <div className="relative bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl animate-fade-up">
                <button 
                    onClick={closePopup}
                    className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full duration-300"
                >
                    <i className="ph ph-x text-xl"></i>
                </button>

                <div className="flex items-center gap-2 text-green-600 mb-6">
                    <i className="ph ph-check-circle-fill text-xl"></i>
                    <span className="font-bold">Successfully added to cart!</span>
                </div>

                <div className="flex gap-6 border-b border-line pb-6">
                    <div className="w-24 aspect-[3/4] relative rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100">
                        <Image 
                            src={lastAddedItem.image} 
                            alt={lastAddedItem.name} 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                    <div>
                        <div className="heading6 mb-1">{lastAddedItem.name}</div>
                        <div className="text-secondary text-sm mb-2">
                            {lastAddedItem.selectedSize && <span>Size: {lastAddedItem.selectedSize}</span>}
                            {lastAddedItem.selectedSize && lastAddedItem.selectedColor && <span className="mx-2">|</span>}
                            {lastAddedItem.selectedColor && <span>Color: {lastAddedItem.selectedColor}</span>}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-secondary">Qty: {lastAddedItem.quantity}</span>
                            <span className="font-bold">₹{lastAddedItem.price}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="heading6 mb-4">You might also like</div>
                    <div className="grid grid-cols-2 gap-4">
                         {/* Mock Recommended Products - In a real app this would fetch based on category */}
                        <div className="flex gap-3 p-3 border border-line rounded-lg hover:border-black duration-300 cursor-pointer group">
                             <div className="w-16 aspect-square relative rounded bg-zinc-100 overflow-hidden flex-shrink-0">
                                <Image 
                                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"
                                    alt="Recommended 1"
                                    fill
                                    className="object-cover group-hover:scale-110 duration-500"
                                />
                             </div>
                             <div>
                                <div className="font-bold line-clamp-1 text-sm">Hydrating Serum</div>
                                <div className="text-xs text-secondary mt-1">₹1,299</div>
                             </div>
                        </div>
                        <div className="flex gap-3 p-3 border border-line rounded-lg hover:border-black duration-300 cursor-pointer group">
                             <div className="w-16 aspect-square relative rounded bg-zinc-100 overflow-hidden flex-shrink-0">
                                <Image 
                                    src="https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1926&auto=format&fit=crop"
                                    alt="Recommended 2"
                                    fill
                                    className="object-cover group-hover:scale-110 duration-500"
                                />
                             </div>
                             <div>
                                <div className="font-bold line-clamp-1 text-sm">Face Mist</div>
                                <div className="text-xs text-secondary mt-1">₹899</div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <button 
                        onClick={closePopup}
                        className="button-main border border-black bg-white text-black py-3 rounded-xl hover:bg-black hover:text-white duration-300 font-bold"
                    >
                        Continue Shopping
                    </button>
                    <Link 
                        href="/checkout" 
                        onClick={closePopup}
                        className="button-main bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 duration-300 font-bold text-center flex items-center justify-center"
                    >
                        Continue To Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
