const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

router.get('/:bookingId', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId).populate('roomId').populate('userId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const payment = await Payment.findOne({ bookingId: booking._id });

        const doc = new PDFDocument();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${booking._id}.pdf`);

        doc.pipe(res);

        // Header
        doc.fontSize(25).text('Resort Booking Invoice', { align: 'center' });
        doc.moveDown();

        // Booking Details
        doc.fontSize(14).text(`Booking ID: ${booking._id}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);
        doc.moveDown();

        doc.text(`Guest Name: ${booking.userId.name}`);
        doc.text(`Email: ${booking.userId.email}`);
        doc.moveDown();

        doc.text(`Room: ${booking.roomId.name}`);
        doc.text(`Check-In: ${new Date(booking.checkIn).toLocaleDateString()}`);
        doc.text(`Check-Out: ${new Date(booking.checkOut).toLocaleDateString()}`);
        doc.text(`Guests: ${booking.guests}`);
        doc.text(`Rooms: ${booking.numberOfRooms || 1}`);
        doc.moveDown();

        // Payment Details
        if (payment) {
            doc.text(`Transaction ID: ${payment.transactionId}`);
            doc.text(`Payment Method: ${payment.paymentMethod}`);
        }

        doc.moveDown();
        doc.fontSize(20).text(`Total Amount: $${booking.totalAmount}`, { align: 'right' });

        doc.end();

    } catch (error) {
        console.error('Error generating invoice:', error);
        res.status(500).json({ message: 'Error generating invoice' });
    }
});

module.exports = router;
