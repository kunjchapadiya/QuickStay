import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        name: "",
        price: "",
        description: "",
        maxGuests: "",
    });

    const [loading, setLoading] = useState(true);

    // Fetch existing room details
    const fetchRoom = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/admin/viewroom/${id}`,
                { withCredentials: true }
            );
            setRoomData(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch room details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoom();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value });
    };

    // Submit Update
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:5000/api/admin/update-room/${id}`,
                roomData,
                { withCredentials: true }
            );
            toast.success("Room updated successfully!");
            navigate("/admin/rooms");
        } catch (err) {
            console.error(err);
            toast.error("Update failed!");
        }
    };

    if (loading)
        return (
            <div className="p-6 text-center text-gray-600">Loading room data...</div>
        );

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Room</h2>

                <form onSubmit={handleUpdate} className="space-y-5">

                    {/* Room Name */}
                    <div>
                        <label className="font-medium text-gray-700">Room Name</label>
                        <input
                            type="text"
                            name="name"
                            value={roomData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-lg"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={roomData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-lg"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={roomData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-lg"
                        ></textarea>
                    </div>

                    {/* Max Guests */}
                    <div>
                        <label className="font-medium text-gray-700">Max Guests</label>
                        <input
                            type="number"
                            name="maxGuests"
                            value={roomData.maxGuests}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-lg"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update Room
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UpdateRoom;
