import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <img
                    src="/images/img4.avif"
                    alt="Contact Us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>
                        Get in Touch
                    </h1>
                    <p className="text-xl font-light max-w-2xl">
                        We are here to assist you with your booking and answer any questions you may have.
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Contact Info Card */}
                    <div className="bg-blue-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col justify-between h-full mt-20">
                        <div>
                            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: `"Playfair Display", serif` }}>
                                Contact Information
                            </h2>
                            <p className="text-blue-200 mb-10 leading-relaxed">
                                Whether you have a question about our rooms, amenities, or availability, our team is ready to help.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-800 rounded-lg">
                                        <MapPin size={24} className="text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Our Location</h3>
                                        <p className="text-blue-200">123 Paradise Lane, Oceanview City, Maldives</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-800 rounded-lg">
                                        <Phone size={24} className="text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Phone Number</h3>
                                        <p className="text-blue-200">+1 (234) 567-8900</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-800 rounded-lg">
                                        <Mail size={24} className="text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Address</h3>
                                        <p className="text-blue-200">reservations@resortbooking.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="p-3 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="p-3 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="p-3 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-10 rounded-3xl shadow-2xl mt-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: `"Playfair Display", serif` }}>
                            Send us a Message
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Inquiry about..."
                                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="How can we help you?"
                                    className="w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full h-14 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2">
                                Send Message
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[400px] bg-gray-200 mt-20 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f7f1f84!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614134444444!5m2!1sen!2sau"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                ></iframe>
            </div>

        </div>
    );
};

export default Contact;