import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DollarSign, Calendar, User, CreditCard } from 'lucide-react';

const ManagePayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/payments/all', { withCredentials: true });
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
                toast.error('Failed to fetch payments');
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) return <div className="p-6 text-center">Loading payments...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment History</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
                            <th className="p-4 font-semibold">Transaction ID</th>
                            <th className="p-4 font-semibold">User</th>
                            <th className="p-4 font-semibold">Booking ID</th>
                            <th className="p-4 font-semibold">Amount</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    No payments found.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm font-mono text-gray-600">
                                        {payment.transactionId}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{payment.userId?.name || 'Unknown'}</p>
                                                <p className="text-xs text-gray-500">{payment.userId?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 font-mono">
                                        {payment.bookingId?._id ? payment.bookingId._id.substring(payment.bookingId._id.length - 6).toUpperCase() : 'N/A'}
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">
                                        ₹{payment.amount}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                                            ${payment.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                                        `}>
                                            {payment.status}
                                        </span>
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

export default ManagePayments;
