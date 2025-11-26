const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Room = require("../models/Room");
const upload = require('../config/multer');

// Protected admin test route
router.get("/admin-protected", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "Admin protected route accessed successfully" });
});

// Get all users
router.get("/viewusers", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error in fetching users" });
    }
});

// Delete user
router.delete("/delete-user/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error in deleting user" });
    }
});

// Update user
router.put("/update-user/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error in updating user" });
    }
});

// Create room
router.post("/create-room", upload.array('images', 5), async (req, res) => {
    try {
        const { name, price, description, maxGuests } = req.body;

        // Get image URLs from local upload
        const images = req.files ? req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];

        const room = new Room({ name, price, description, images, maxGuests });
        await room.save();
        return res.status(200).json({ message: "Room created successfully", room });
    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ message: "Error in creating room" });
    }
});

// Get all rooms
router.get("/viewrooms", async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(500).json({ message: "Error in fetching rooms" });
    }
});

// Get single room
router.get("/viewroom/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        return res.status(200).json(room);
    } catch (error) {
        return res.status(500).json({ message: "Error in fetching room" });
    }
});

router.delete("/delete-room/:id", async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error in deleting room" });
    }
});

// Update room
router.put("/update-room/:id", upload.array('images', 5), async (req, res) => {
    try {
        const { name, price, description, maxGuests } = req.body;
        const updateData = { name, price, description, maxGuests };

        // Only update images if new ones are uploaded
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        }

        await Room.findByIdAndUpdate(req.params.id, updateData);
        return res.status(200).json({ message: "Room updated successfully" });
    } catch (error) {
        console.error("Error updating room:", error);
        return res.status(500).json({ message: "Error in updating room" });
    }
});

module.exports = router;
