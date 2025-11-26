import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, IndianRupee, FileText } from 'lucide-react';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) return;
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/my-bookings/${user._id}`, { withCredentials: true });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [user]);

    const handleCancel = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        try {
            await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`, { userId: user._id }, { withCredentials: true });
            setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: 'Cancelled' } : b));
            // toast.success('Booking cancelled successfully'); // Assuming toast is imported or available, if not, remove
        } catch (error) {
            console.error('Error cancelling booking:', error);
            // toast.error('Failed to cancel booking');
        }
    };

    const downloadInvoice = async (bookingId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/invoice/${bookingId}`, {
                responseType: 'blob',
                withCredentials: true
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${bookingId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading invoice:', error);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading bookings...</div>;

    return (
        <div className="container mx-auto p-6 mt-10 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 font-serif">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg">You haven't made any bookings yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.roomId?.name || 'Room Details Unavailable'}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>
                                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{booking.guests} Guests</span>
                                    </div>
                                    {booking.numberOfRooms && (
                                        <div className="flex items-center gap-1">
                                            <FileText size={16} />
                                            <span>{booking.numberOfRooms} Rooms</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Booking ID: {booking._id}</p>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                                        ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }
                                    `}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className="text-xl font-bold text-blue-600 flex items-center">
                                    <IndianRupee size={20} />
                                    {booking.totalAmount}
                                </div>
                                <div className="flex gap-2">
                                    {booking.status !== 'Cancelled' && (
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    {booking.status === 'Confirmed' && (
                                        <button
                                            onClick={() => downloadInvoice(booking._id)}
                                            className="flex items-center gap-1 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors border border-blue-200"
                                        >
                                            <FileText size={16} />
                                            Invoice
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
