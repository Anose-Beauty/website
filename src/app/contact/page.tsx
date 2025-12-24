'use client';

import React from 'react';

export default function ContactPage() {
    return (
        <div className="contact-page">
            <div className="breadcrumb-block style-shared">
                <div className="breadcrumb-main bg-linear overflow-hidden bg-zinc-50 py-10">
                    <div className="container mx-auto relative">
                        <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                            <div className="text-content text-center">
                                <h2 className="heading2 font-bold text-4xl">Contact Us</h2>
                                <div className="link flex items-center justify-center gap-1 caption1 mt-3 text-zinc-500">
                                    <a href="/" className="hover:text-black">Homepage</a>
                                    <i className="ph ph-caret-right text-sm"></i>
                                    <div className="capitalize">Contact Us</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-us md:py-20 py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between gap-y-10">
                        <div className="left lg:w-2/3 w-full lg:pr-10">
                            <h3 className="heading3 text-3xl font-bold">Drop Us A Line</h3>
                            <p className="body1 text-zinc-500 mt-3">Use the form below to get in touch with the sales team</p>
                            <form className="md:mt-10 mt-6 space-y-5">
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                                    <div className="name">
                                        <input
                                            className="border border-line px-4 py-3 w-full rounded-xl focus:border-black outline-none transition-all"
                                            type="text"
                                            placeholder="Your Name *"
                                            required
                                        />
                                    </div>
                                    <div className="email">
                                        <input
                                            className="border border-line px-4 py-3 w-full rounded-xl focus:border-black outline-none transition-all"
                                            type="email"
                                            placeholder="Your Email *"
                                            required
                                        />
                                    </div>
                                    <div className="message sm:col-span-2">
                                        <textarea
                                            className="border border-line px-4 py-3 w-full rounded-xl focus:border-black outline-none transition-all"
                                            rows={5}
                                            placeholder="Your Message *"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="block-button">
                                    <button type="submit" className="button-main bg-purple-600 text-white px-10 py-4 rounded-xl font-bold uppercase hover:bg-purple-700 transition-colors">
                                        Send message
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="right lg:w-1/4 w-full">
                            <div className="item">
                                <h4 className="heading4 font-bold text-xl uppercase">Our Store</h4>
                                <p className="mt-4 text-zinc-600">2163 Phillips Gap Rd, West Jefferson, North Carolina, United States</p>
                                <p className="mt-3 text-zinc-600">Phone: <span className="whitespace-nowrap font-bold text-black">+1 666 8888</span></p>
                                <p className="mt-1 text-zinc-600">Email: <span className="whitespace-nowrap font-bold text-black">hi.avitex@gmail.com</span></p>
                            </div>
                            <div className="item mt-12 pt-10 border-t border-line">
                                <h4 className="heading4 font-bold text-xl uppercase">Open Hours</h4>
                                <div className="mt-4 space-y-2">
                                    <p className="text-zinc-600 flex justify-between"><span>Mon - Fri:</span> <span className="font-semibold text-black text-right">7:30am - 8:00pm PST</span></p>
                                    <p className="text-zinc-600 flex justify-between"><span>Saturday:</span> <span className="font-semibold text-black text-right">8:00am - 6:00pm PST</span></p>
                                    <p className="text-zinc-600 flex justify-between"><span>Sunday:</span> <span className="font-semibold text-black text-right">9:00am - 5:00pm PST</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="map h-[500px] w-full mt-10 grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden rounded-3xl container mx-auto mb-20">
                <iframe
                    className="w-full h-full border-0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.1466107534056!2d-81.49247136581288!3d36.40281150719292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8851ac9789084bdd%3A0x854168300ff0fb4b!2sDr%20Pepper.Grapette%20Bottling%20Co.!5e1!3m2!1svi!2s!4v1721783628866!5m2!1svi!2s"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
