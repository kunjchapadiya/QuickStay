import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Herosection from "./Herosection";
import "../stylesheets/Home.css";
import "../stylesheets/App.css";
import { MapPin, IndianRupee } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/viewrooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      {/* hero section */}
      <Herosection />

      {/* Featured Destination */}
      <div className="featured w-full bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="title text-center mb-5">
            <h1 className="text-3xl md:text-4xl font-semibold">Featured Destination</h1>
          </div>

          <div className="subtitle text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            <p>
              Discover our handpicked selection of exceptional properties around
              the world, offering unparalleled luxury and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {/* CARD 1 */}
            {rooms.slice(0, 4).map((room) => (
              <div key={room._id} className="hotelCard bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={room.images && room.images.length > 0 ? room.images[0] : "https://via.placeholder.com/400x300"}
                  alt={room.name}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => e.target.src = "https://via.placeholder.com/400x300"}
                />

                <div className="flex justify-between items-center mt-3">
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <p className="text-orange-500 font-semibold text-sm">⭐ 4.5</p>
                </div>

                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <p className="text-xs truncate">{room.description ? room.description.substring(0, 30) + "..." : "Luxury Stay"}</p>
                </div>

                <div className="flex items-center gap-1 mt-3">
                  <IndianRupee className="w-5 h-5" />
                  <p className="text-lg font-semibold">
                    {room.price}/<span className="text-gray-500 text-sm font-normal">night</span>
                  </p>
                </div>

                <button
                  className="mt-4 w-full py-2 rounded-lg border border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition text-sm"
                  onClick={() => navigate(`/room/${room._id}`)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>

          {/* View all rooms button */}
          <div className="flex justify-center">
            <button
              className="w-full max-w-xs py-3 rounded-lg border border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition"
              onClick={() => navigate('/rooms')}
            >
              View All Rooms
            </button>
          </div>
        </div>
      </div>

      {/* Offers */}
      <div className="offers py-10 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">Exclusive Offers</h1>
            <p className="text-gray-600 max-w-2xl">
              Take advantage of our limited-time offers and special packages to
              enhance your stay and create unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="OffersCard bg-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">Summer Escape</h2>
                <p className="text-blue-100 text-sm mb-4">
                  Enjoy a complimentary night and daily breakfast.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-blue-200">Expires in 2 days</p>
                  </div>
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                    25% OFF
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="feedback bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">What Our Guests Say</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why discerning travelers consistently choose QuickStay for
              their exclusive and luxurious accommodations around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Doe", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", text: "QuickStay provided an exceptional experience from start to finish. The booking process was seamless." },
              { name: "Liam Johnson", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", text: "I've used many booking platforms before, but none compare to the personalized experience." },
              { name: "Sophia Lee", img: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", text: "Their curated selection of hotels is unmatched. I highly recommend QuickStay." }
            ].map((feedback, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={feedback.img}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                    <p className="text-sm text-gray-500">Traveler</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 text-sm leading-relaxed">"{feedback.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsLetter bg-gray-200 py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto text-white">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Stay Inspired</h1>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Join our newsletter and be the first to discover new destinations,
              exclusive offers, and travel inspiration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
