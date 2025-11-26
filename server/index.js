const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Authentication");
const adminRoutes = require("./routes/AdminRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const invoiceRoutes = require("./routes/InvoiceRoutes");

require("dotenv").config();
const app = express();
const port = 5000;

// CORS FIX
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB error:", err));

// Auth routes
app.use("/api", authRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Booking routes
app.use("/api/bookings", bookingRoutes);

// Payment routes
app.use("/api/payments", paymentRoutes);

// Invoice routes
app.use("/api/invoice", invoiceRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
