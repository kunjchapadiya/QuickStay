const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const salt = 10;

//  |=============================================
//  |  register                                   |
//  |=============================================

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        console.log("Register request body:", req.body);
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, salt);
        const user = new User({
            name: username, // Changed from username to name to match schema
            email: email,
            password: hash,
            role: "user" // Default role
        });

        await user.save();

        // Generate token for auto-login
        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, "secret", { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({
            message: "User registered successfully",
            token,
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Error in registering user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, "secret", { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in login" });
    }
});

//  |=============================================//
//  |   logout                                  |//
//  |=============================================//

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
});

//  |=============================================//
//  |   protected route                           |//
//  |=============================================//

router.get("/protected", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "Protected route accessed successfully" });
});

//  |=============================================//
//  |   Admin protected route                           |//
//  |=============================================//

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Access denied. Admin only." });

    next();
};

// Forgot Password
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token (using JWT for simplicity, or just a random string)
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: '15m' });

        // In a real app, you would send this token via email.
        // For this demo, we'll return it in the response.
        console.log(`Reset Token for ${email}: ${resetToken}`);

        res.status(200).json({
            message: "Password reset link sent to your email (Check console for token)",
            resetToken
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        } catch (err) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;