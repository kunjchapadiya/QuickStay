import React from 'react';
import { Wifi, Coffee, Car, Dumbbell, Utensils, Waves, Star, MapPin, ArrowRight } from 'lucide-react';

const About = () => {
    const facilities = [
        { icon: <Waves size={32} />, name: "Infinity Pool", desc: "Overlooking the ocean with a sunset view." },
        { icon: <Utensils size={32} />, name: "Gourmet Dining", desc: "World-class chefs serving local and international cuisine." },
        { icon: <Dumbbell size={32} />, name: "Modern Gym", desc: "State-of-the-art equipment for your fitness routine." },
        { icon: <Coffee size={32} />, name: "Luxury Spa", desc: "Rejuvenate your mind and body with premium treatments." },
        { icon: <Wifi size={32} />, name: "High-Speed Wifi", desc: "Stay connected seamlessly throughout the resort." },
        { icon: <Car size={32} />, name: "Valet Parking", desc: "Complimentary secure parking for all guests." },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <img
                    src="/images/img1.avif"
                    alt="Resort Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>
                        Welcome to Paradise
                    </h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl">
                        Experience the epitome of luxury and tranquility at our oceanfront resort.
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-20 px-6 md:px-20 bg-white text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: `"Playfair Display", serif` }}>
                    Our Story
                </h2>
                <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                    Nestled along the pristine coastline, our resort was founded with a single vision: to create a sanctuary where luxury meets nature.
                    From our humble beginnings as a boutique getaway to becoming a world-renowned destination, we have remained committed to providing
                    unparalleled hospitality. Every corner of our resort is designed to offer you a sense of peace, wonder, and indulgence.
                </p>
            </div>

            {/* Facilities Grid */}
            <div className="py-20 px-6 md:px-20 bg-gray-50">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>
                        World-Class Facilities
                    </h2>
                    <p className="text-gray-600">Designed for your comfort and entertainment</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {facilities.map((facility, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                {facility.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                            <p className="text-gray-500">{facility.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Specialities Section (Alternating Layout) */}
            <div className="py-20">
                {/* Item 1 */}
                <div className="flex flex-col md:flex-row items-center mb-20">
                    <div className="w-full md:w-1/2 h-[500px]">
                        <img src="/images/img2.avif" alt="Private Beach" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full md:w-1/2 px-10 md:px-20 py-10">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>
                            Private Beach Access
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Step out of your room and onto the soft, white sands of our exclusive private beach.
                            Enjoy sunbathing, beach volleyball, or a romantic sunset walk without the crowds.
                            Our beach service ensures your favorite drinks are always within reach.
                        </p>
                        <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                            Learn More <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="w-full md:w-1/2 h-[500px]">
                        <img src="/images/img3.avif" alt="Fine Dining" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full md:w-1/2 px-10 md:px-20 py-10">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>
                            Exquisite Culinary Journey
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Indulge your palate with a diverse array of culinary delights. Our award-winning chefs
                            craft menus that celebrate local flavors and international classics. Whether it's a
                            candlelit dinner by the ocean or a vibrant breakfast buffet, every meal is a masterpiece.
                        </p>
                        <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                            View Menu <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-blue-900 py-20 text-center text-white px-4">
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: `"Playfair Display", serif` }}>
                    Ready for the Vacation of a Lifetime?
                </h2>
                <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                    Book your stay today and experience luxury like never before.
                </p>
                <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                    Book Your Stay Now
                </button>
            </div>

        </div>
    );
};

export default About;