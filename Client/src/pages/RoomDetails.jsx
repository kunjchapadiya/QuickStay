import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users, IndianRupee } from 'lucide-react';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/viewroom/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error('Error fetching room:', error);
                toast.error('Failed to load room details');
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id]);

    useEffect(() => {
        if (room && checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                setTotalPrice(diffDays * room.price * numberOfRooms);
            } else {
                setTotalPrice(0);
            }
        }
    }, [checkIn, checkOut, room, numberOfRooms]);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to book a room');
            navigate('/login');
            return;
        }

        if (!checkIn || !checkOut) {
            toast.error('Please select check-in and check-out dates');
            return;
        }

        // Redirect to Payment Page with booking details
        navigate('/payment', {
            state: {
                bookingData: {
                    userId: user._id,
                    roomId: room._id,
                    checkIn,
                    checkOut,
                    guests,
                    numberOfRooms,
                    totalAmount: totalPrice
                },
                room
            }
        });
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!room) return <div className="p-10 text-center">Room not found</div>;

    return (
        <div className="container mx-auto p-6 mt-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <img
                        src={room.images[0] || "https://via.placeholder.com/600x400"}
                        alt={room.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-8">
                    <h1 className="text-3xl font-bold mb-4 font-serif">{room.name}</h1>
                    <p className="text-gray-600 mb-6">{room.description}</p>

                    <div className="flex items-center gap-2 text-2xl font-semibold text-blue-600 mb-6">
                        <IndianRupee size={24} />
                        {room.price} <span className="text-sm text-gray-500 font-normal">/ Night</span>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="font-semibold mb-4">Book this Room</h3>
                        <form onSubmit={handleBooking} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Check-In</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Check-Out</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            min={checkIn || new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                            <input
                                                type="number"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={guests}
                                                onChange={(e) => {
                                                    const newGuests = Math.max(1, parseInt(e.target.value) || 1);
                                                    setGuests(newGuests);
                                                    const requiredRooms = Math.ceil(newGuests / room.maxGuests);
                                                    if (numberOfRooms < requiredRooms) {
                                                        setNumberOfRooms(requiredRooms);
                                                    }
                                                }}
                                                min="1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Rooms</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={numberOfRooms}
                                                onChange={(e) => {
                                                    const newRooms = Math.max(1, parseInt(e.target.value) || 1);
                                                    const requiredRooms = Math.ceil(guests / room.maxGuests);
                                                    setNumberOfRooms(Math.max(newRooms, requiredRooms));
                                                }}
                                                min={Math.ceil(guests / room.maxGuests)}
                                                max="10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="font-semibold text-gray-700">Total Price:</span>
                                <span className="text-xl font-bold text-blue-600">₹{totalPrice}</span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
