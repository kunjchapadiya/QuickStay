const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Create a new payment
router.post('/create', async (req, res) => {
    try {
        const { bookingId, userId, amount, transactionId } = req.body;

        const newPayment = new Payment({
            bookingId,
            userId,
            amount,
            transactionId,
            status: 'Completed'
        });

        await newPayment.save();

        // Update booking status to Confirmed if it was Pending
        await Booking.findByIdAndUpdate(bookingId, { status: 'Confirmed' });

        res.status(201).json({ message: 'Payment recorded successfully', payment: newPayment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Server error while processing payment' });
    }
});

// Get all payments (Admin)
router.get('/all', async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('userId', 'name email')
            .populate('bookingId')
            .sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Server error fetching payments' });
    }
});

module.exports = router;
