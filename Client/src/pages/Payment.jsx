import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreditCard, Lock, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { bookingData, room } = location.state || {};

    const [processing, setProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!bookingData || !room) {
            toast.error("Invalid booking details");
            navigate('/rooms');
        }
    }, [bookingData, room, navigate]);

    const handlePayment = async () => {
        setProcessing(true);

        // Simulate payment processing delay
        setTimeout(async () => {
            try {
                // 1. Create Booking
                const bookingResponse = await axios.post('http://localhost:5000/api/bookings/create', {
                    ...bookingData,
                    status: 'Confirmed' // Assuming payment confirms it immediately
                }, { withCredentials: true });

                const bookingId = bookingResponse.data.booking._id;

                // 2. Create Payment Record
                const paymentData = {
                    bookingId,
                    userId: user._id,
                    amount: bookingData.totalAmount,
                    transactionId: 'TXN' + Date.now() + Math.floor(Math.random() * 1000)
                };

                await axios.post('http://localhost:5000/api/payments/create', paymentData, { withCredentials: true });

                setProcessing(false);
                setShowSuccess(true);

                // Redirect after showing success for a moment
                setTimeout(() => {
                    navigate('/payment-success', { state: { paymentData, room } });
                }, 2000);

            } catch (error) {
                console.error("Payment/Booking Error:", error);
                toast.error("Transaction failed. Please try again.");
                setProcessing(false);
            }
        }, 2000); // 2 second fake delay
    };

    if (!bookingData || !room) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">

                {/* Success Overlay */}
                {showSuccess && (
                    <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="text-green-600 w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
                        <p className="text-gray-500 mt-2">Redirecting you...</p>
                    </div>
                )}

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Confirm Payment
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Secure checkout for your stay at QuickStay
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Room:</span>
                        <span className="font-medium text-gray-900">{room.name}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Dates:</span>
                        <span className="font-medium text-gray-900">{bookingData.checkIn} to {bookingData.checkOut}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Guests:</span>
                        <span className="font-medium text-gray-900">{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Rooms:</span>
                        <span className="font-medium text-gray-900">{bookingData.numberOfRooms}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-lg font-bold text-blue-600">
                        <span>Total:</span>
                        <span>₹{bookingData.totalAmount}</span>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="p-4 border border-gray-300 rounded-md bg-gray-50 flex items-center gap-3">
                            <CreditCard className="text-gray-400" />
                            <span className="text-gray-500 font-mono">**** **** **** 4242</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${processing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <Loader className="animate-spin h-5 w-5" />
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Pay ₹{bookingData.totalAmount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
