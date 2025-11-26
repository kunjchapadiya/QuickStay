import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Wifi, WavesLadder, HandPlatter, IndianRupee, Star,
  Utensils, Bath, Dumbbell, Mountain, SquareParking,
  LandPlot, Martini, Trees, Image as ImageIcon
} from 'lucide-react';

const ViewRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/viewrooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading rooms...</div>;

  return (
    <>
      {/* Page Title */}
      <div className="hotelTitle mt-20 font-semibold text-4xl ml-5">
        <h1 style={{ fontFamily: `"Playfair", serif` }}>Resort Rooms</h1>
      </div>

      {/* Subtitle */}
      <div className="captions ml-5">
        <p>Take advantage of our limited-time offers and special packages to enhance your stay and create</p>
        <p>unforgettable memories.</p>
      </div>

      {/* ---- WRAPPER : Center All Cards ---- */}
      <div className="w-full flex flex-col justify-center items-center">

        {rooms.length === 0 ? (
          <p className="mt-10 text-gray-500">No rooms available at the moment.</p>
        ) : (
          rooms.map((room) => (
            <div key={room._id} className="room m-5 flex w-3/4 bg-gray-100 p-5 rounded-lg shadow-lg">

              <div className="roomInfo flex w-full">
                <div className="roomImg w-1/2">
                  <img
                    src={room.images[0] || "https://via.placeholder.com/600x400"}
                    alt={room.name}
                    className="rounded-lg w-full h-64 object-cover"
                  />
                </div>

                <div className="roomDetail flex flex-col gap-2 ml-5 justify-center w-1/2">
                  <h2 className="text-3xl font-bold" style={{ fontFamily: `"Playfair", serif` }}>{room.name}</h2>
                  <p className="text-gray-600 line-clamp-3">{room.description}</p>

                  <div className="facilities flex flex-wrap gap-2 my-3 p-2">
                    <div className="facility flex items-center bg-gray-200 p-1 rounded-md">
                      <Wifi size={20} className="mr-2" /><p>Free Wifi</p>
                    </div>
                    <div className="facility flex items-center bg-gray-200 p-1 rounded-md">
                      <WavesLadder size={20} className="mr-2" /><p>Pool Access</p>
                    </div>
                    <div className="facility flex items-center bg-gray-200 p-1 rounded-md">
                      <HandPlatter size={20} className="mr-2" /><p>Room Service</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="roomBooking flex flex-col justify-center items-center px-10 w-1/3 border-l border-gray-200 ml-5">
                <div className="review flex items-center mb-5 gap-2">
                  <p>Review:</p>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={20} fill="yellow" className="text-yellow-400" />
                  ))}
                </div>

                <div className="roomPrice flex items-center mb-4">
                  <IndianRupee />
                  <h2 className="text-xl font-semibold">{room.price}/Night</h2>
                </div>

                <Link
                  to={`/room/${room._id}`}
                  role="button"
                  className="border border-zinc-900 w-full py-2 rounded-md mt-3
                             text-zinc-900 flex items-center justify-center
                             hover:bg-black hover:text-white transition-colors font-medium"
                >
                  Book Now
                </Link>

              </div>
            </div>
          ))
        )}

      </div>
    </>
  );
};

export default ViewRooms;
