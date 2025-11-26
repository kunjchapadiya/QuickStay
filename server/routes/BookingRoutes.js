const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const User = require("../models/User");

// Create a new booking
router.post("/create", async (req, res) => {
    try {
        const { userId, roomId, checkIn, checkOut, guests, totalAmount, numberOfRooms } = req.body;

        const booking = new Booking({
            userId,
            roomId,
            checkIn,
            checkOut,
            guests,
            totalAmount,
            numberOfRooms: numberOfRooms || 1,
            status: "Pending"
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error creating booking" });
    }
});

// Get bookings for a specific user
router.get("/my-bookings/:userId", async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId })
            .populate("roomId")
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// Get all bookings (Admin)
router.get("/all-bookings", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("userId", "name email")
            .populate("roomId", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// Cancel booking request (user)
router.put('/cancel/:id', async (req, res) => {
    try {
        const { userId } = req.body; // user making request
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }
        // Only allow cancel if not already cancelled
        if (booking.status === 'Cancelled') {
            return res.status(400).json({ message: 'Booking already cancelled' });
        }
        booking.status = 'Cancelled';
        await booking.save();
        res.status(200).json({ message: 'Booking cancelled', booking });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Server error while cancelling booking' });
    }
});


// Get Dashboard Stats
router.get("/stats", async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const totalRevenueResult = await Booking.aggregate([
            { $match: { status: "Confirmed" } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

        const roomsCount = await Room.countDocuments();
        const usersCount = await User.countDocuments();

        // Calculate trends (mock logic for now or simple comparison if we had timestamps for everything)
        // For simplicity, returning static trends or 0

        res.status(200).json({
            totalBookings,
            totalRevenue,
            roomsCount,
            usersCount
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Error fetching stats" });
    }
});

module.exports = router;
