'use client';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface MyAccountClientProps {
    user: any;
}

export default function MyAccountClient({ user }: MyAccountClientProps) {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: 'ph-house-line' },
        { id: 'orders', label: 'History Orders', icon: 'ph-package' },
        { id: 'address', label: 'My Address', icon: 'ph-tag' },
        { id: 'setting', label: 'Setting', icon: 'ph-gear-six' },
    ];

    return (
        <div className="my-account-block md:py-20 py-10">
            <div className="container mx-auto">
                <div className="content-main lg:px-[60px] md:px-4 flex gap-y-8 max-md:flex-col w-full">
                    {/* Left Sidebar */}
                    <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
                        <div className="user-infor bg-surface md:px-8 px-5 md:py-10 py-6 md:rounded-[20px] rounded-xl bg-zinc-50 border border-zinc-100">
                            <div className="heading flex flex-col items-center justify-center">
                                <div className="avatar">
                                    <div className="md:w-[140px] w-[120px] md:h-[140px] h-[120px] rounded-full bg-zinc-200 flex items-center justify-center text-4xl font-bold text-zinc-500 capitalize">
                                        {user?.name?.[0] || 'U'}
                                    </div>
                                </div>
                                <div className="name heading6 mt-4 text-center font-bold">{user?.name}</div>
                                <div className="mail heading6 font-normal normal-case text-secondary text-center mt-1 text-zinc-500">{user?.email}</div>
                            </div>
                            <div className="menu-tab list-category w-full max-w-none lg:mt-10 mt-6">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`category-item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 mb-1.5 ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'hover:bg-white text-zinc-600'
                                            }`}
                                    >
                                        <i className={`ph ${tab.icon} text-xl`}></i>
                                        <strong className="heading6 font-semibold">{tab.label}</strong>
                                    </button>
                                ))}
                                <button
                                    onClick={() => signOut()}
                                    className="category-item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 text-red-500"
                                >
                                    <i className="ph ph-sign-out text-xl"></i>
                                    <strong className="heading6 font-semibold">Logout</strong>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="right md:w-2/3 w-full pl-2.5">
                        {activeTab === 'dashboard' && (
                            <div className="filter-item text-content w-full">
                                <div className="overview grid sm:grid-cols-3 gap-5">
                                    <div className="overview-item flex items-center justify-between p-5 border border-line rounded-lg shadow-sm">
                                        <div className="counter">
                                            <span className="text-secondary text-sm">Awaiting Pickup</span>
                                            <h5 className="heading5 mt-1 font-bold">0</h5>
                                        </div>
                                        <i className="ph ph-hourglass-medium text-4xl text-zinc-300"></i>
                                    </div>
                                    <div className="overview-item flex items-center justify-between p-5 border border-line rounded-lg shadow-sm">
                                        <div className="counter">
                                            <span className="text-secondary text-sm">Cancelled Orders</span>
                                            <h5 className="heading5 mt-1 font-bold">0</h5>
                                        </div>
                                        <i className="ph ph-receipt-x text-4xl text-zinc-300"></i>
                                    </div>
                                    <div className="overview-item flex items-center justify-between p-5 border border-line rounded-lg shadow-sm">
                                        <div className="counter">
                                            <span className="text-secondary text-sm">Total Orders</span>
                                            <h5 className="heading5 mt-1 font-bold">0</h5>
                                        </div>
                                        <i className="ph ph-package text-4xl text-zinc-300"></i>
                                    </div>
                                </div>
                                <div className="recent_order pt-5 px-5 pb-2 mt-7 border border-line rounded-xl">
                                    <h6 className="heading6 font-bold mb-4">Recent Orders</h6>
                                    <div className="text-center py-10 text-zinc-400">
                                        <p>You have no recent orders.</p>
                                        <Link href="/shop" className="text-black font-bold underline mt-2 inline-block">Start Shopping</Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="filter-item text-content w-full p-7 border border-line rounded-xl">
                                <h6 className="heading6 font-bold mb-4">Order History</h6>
                                <div className="text-center py-10 text-zinc-400">
                                    <p>No orders found.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'address' && (
                            <div className="filter-item text-content w-full p-7 border border-line rounded-xl">
                                <h6 className="heading6 font-bold mb-4">Saved Addresses</h6>
                                <div className="text-center py-10 text-zinc-400">
                                    <p>You haven't saved any addresses yet.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'setting' && (
                            <div className="filter-item text-content w-full p-7 border border-line rounded-xl">
                                <h6 className="heading6 font-bold mb-4">Account Settings</h6>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700">Display Name</label>
                                        <input type="text" defaultValue={user?.name} className="mt-1 block w-full border border-zinc-200 rounded-lg p-2" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700">Email Address</label>
                                        <input type="email" defaultValue={user?.email} className="mt-1 block w-full border border-zinc-200 rounded-lg p-2" disabled />
                                    </div>
                                    <button className="button-main bg-purple-600 text-white px-6 py-2 rounded-lg font-bold">Save Changes</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
