const mongoose = require("mongoose");
const schema = mongoose.Schema;
// mongoose.connect("mongodb://localhost:27017/resortBooking");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:
    {
        type: String,
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);