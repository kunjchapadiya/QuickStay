import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, FileText } from 'lucide-react';

const PaymentSucess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentData, room } = location.state || {};

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600 w-14 h-14" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                <p className="text-gray-500 mb-8">Thank you for your payment. Your room has been successfully booked.</p>

                {paymentData && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500 text-sm">Transaction ID</span>
                            <span className="font-mono text-sm font-medium text-gray-900">{paymentData.transactionId}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500 text-sm">Amount Paid</span>
                            <span className="font-bold text-gray-900">₹{paymentData.amount}</span>
                        </div>
                        {room && (
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Room</span>
                                <span className="font-medium text-gray-900">{room.name}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/my-bookings')}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <FileText size={20} />
                        View My Bookings
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSucess;