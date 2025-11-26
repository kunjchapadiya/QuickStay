import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, User, CheckCircle, XCircle, Clock } from 'lucide-react';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/bookings/all-bookings', { withCredentials: true });
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/bookings/update-status/${id}`, { status }, { withCredentials: true });
            toast.success(`Booking ${status} successfully`);
            fetchBookings();
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="p-6 text-center">Loading bookings...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Bookings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
                            <th className="p-4 font-semibold">Booking ID</th>
                            <th className="p-4 font-semibold">Guest</th>
                            <th className="p-4 font-semibold">Room</th>
                            <th className="p-4 font-semibold">Dates</th>
                            <th className="p-4 font-semibold">Total</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-500">
                                    No bookings found.
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm text-gray-600 font-mono">
                                        {booking._id.substring(booking._id.length - 6).toUpperCase()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{booking.userId?.name || 'Unknown'}</p>
                                                <p className="text-xs text-gray-500">{booking.userId?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-700 font-medium">
                                        {booking.roomId?.name || 'Deleted Room'}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(booking.checkIn).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(booking.checkOut).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">
                                        ₹{booking.totalAmount}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1
                                            ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }
                                        `}>
                                            {booking.status === 'Confirmed' && <CheckCircle size={12} />}
                                            {booking.status === 'Pending' && <Clock size={12} />}
                                            {booking.status === 'Cancelled' && <XCircle size={12} />}
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {booking.status === 'Pending' && (
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => updateStatus(booking._id, 'Confirmed')}
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                    title="Confirm"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(booking._id, 'Cancelled')}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Cancel"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        )}
                                        {booking.status !== 'Pending' && (
                                            <span className="text-xs text-gray-400">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
