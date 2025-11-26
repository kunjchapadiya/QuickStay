import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Wifi, Coffee, Waves, BedDouble, Calendar, Users, Star, ArrowRight } from "lucide-react";

const DeluxeRoom = () => {

  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adult, setAdult] = useState("1");
  const [children, setChildren] = useState("0");
  const [dateError, setDateError] = useState("");

  // TODAY'S DATE (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  const validateDates = (start, end) => {
    if (start && end) {
      if (new Date(start) >= new Date(end)) {
        setDateError("Check-Out date must be AFTER Check-In date.");
      } else {
        setDateError("");
      }
    }
  };

  return (
    <>
      <div className="part mt-20 flex flex-row w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

        {/* LEFT: SLIDER */}
        <div className="w-1/2 px-10 flex justify-center items-center relative">
          {/* Decorative blob */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            slidesPerView={1}
            loop
            spaceBetween={30}
            className="rounded-2xl shadow-2xl w-full z-10"
          >
            {["img1", "img2", "img3", "img4"].map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`/images/${img}.avif`}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT: BOOKING FORM */}
        <div className="w-1/2 px-10 flex flex-col justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>Deluxe Room</h1>
              <div className="flex justify-center gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed" style={{ fontFamily: `"Playfair Display", serif` }}>
                Experience luxury with breathtaking ocean views and premium amenities.
              </p>
            </div>

            {/* AMENITIES */}
            <div className="flex justify-center gap-6 mb-10 text-gray-600">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Wifi size={20} /></div>
                <span className="text-xs font-medium">Free Wifi</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Waves size={20} /></div>
                <span className="text-xs font-medium">Ocean View</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Coffee size={20} /></div>
                <span className="text-xs font-medium">Breakfast</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600"><BedDouble size={20} /></div>
                <span className="text-xs font-medium">King Bed</span>
              </div>
            </div>

            <form className="space-y-6 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Glass shine effect */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

              {/* DATE SECTION */}
              <div className="grid grid-cols-2 gap-6">
                {/* Check-In */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Check-In</label>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        validateDates(e.target.value, checkOut);
                      }}
                      className={`w-full h-12 pl-10 pr-4 rounded-xl border-2 bg-white/50 outline-none transition-all duration-300
                        ${dateError ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"}`}
                    />
                  </div>
                </div>

                {/* Check-Out */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Check-Out</label>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        validateDates(checkIn, e.target.value);
                      }}
                      className={`w-full h-12 pl-10 pr-4 rounded-xl border-2 bg-white/50 outline-none transition-all duration-300
                        ${dateError ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"}`}
                    />
                  </div>
                </div>
              </div>

              {/* Error message */}
              {dateError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-sm font-medium animate-pulse">
                  <span>⚠</span> {dateError}
                </div>
              )}

              {/* GUEST SECTION */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Adults</label>
                  <div className="relative group">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <select
                      value={adult}
                      onChange={(e) => setAdult(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-200 bg-white/50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Children</label>
                  <div className="relative group">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <select
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-200 bg-white/50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none"
                    >
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group" onClick={() => {
                navigate("/payment"
                );
              }}>
                Book Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeluxeRoom;
