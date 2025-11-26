import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users,
    BedDouble,
    CalendarCheck,
    DollarSign,
    TrendingUp,
    Clock
} from 'lucide-react';

const StatCard = ({ title, value, icon: StatIcon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <StatIcon size={24} className="text-white" />
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 flex items-center font-medium">
                    <TrendingUp size={16} className="mr-1" />
                    {trend}
                </span>
                <span className="text-gray-400 ml-2">vs last month</span>
            </div>
        )}
    </div>
);

const RecentBookingRow = ({ guest, room, date, status, amount }) => (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
        <td className="py-4 px-4">
            <div className="font-medium text-gray-800">{guest}</div>
        </td>
        <td className="py-4 px-4 text-gray-600">{room}</td>
        <td className="py-4 px-4 text-gray-600">{date}</td>
        <td className="py-4 px-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium
        ${status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                }
      `}>
                {status}
            </span>
        </td>
        <td className="py-4 px-4 font-medium text-gray-800">₹{amount}</td>
    </tr>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        roomsCount: 0,
        usersCount: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await axios.get('http://localhost:5000/api/bookings/stats', { withCredentials: true });
                setStats(statsRes.data);

                const bookingsRes = await axios.get('http://localhost:5000/api/bookings/all-bookings', { withCredentials: true });
                setRecentBookings(bookingsRes.data.slice(0, 5)); // Get top 5 recent
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const statCards = [
        { title: 'Total Bookings', value: stats.totalBookings, icon: CalendarCheck, color: 'bg-blue-500', trend: '+12.5%' },
        { title: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: DollarSign, color: 'bg-green-500', trend: '+8.2%' },
        { title: 'Available Rooms', value: stats.roomsCount, icon: BedDouble, color: 'bg-purple-500', trend: '-2.4%' },
        { title: 'Registered Users', value: stats.usersCount, icon: Users, color: 'bg-orange-500', trend: '+5.3%' },
    ];

    if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                    <Clock size={20} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Bookings Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="py-4 px-4 font-semibold">Guest</th>
                                <th className="py-4 px-4 font-semibold">Room</th>
                                <th className="py-4 px-4 font-semibold">Date</th>
                                <th className="py-4 px-4 font-semibold">Status</th>
                                <th className="py-4 px-4 font-semibold">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-gray-500">No recent bookings</td>
                                </tr>
                            ) : (
                                recentBookings.map((booking, index) => (
                                    <RecentBookingRow
                                        key={index}
                                        guest={booking.userId?.name || 'Unknown'}
                                        room={booking.roomId?.name || 'Deleted Room'}
                                        date={new Date(booking.checkIn).toLocaleDateString()}
                                        status={booking.status}
                                        amount={booking.totalAmount}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;