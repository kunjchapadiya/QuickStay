import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Save, ArrowLeft } from 'lucide-react';

const UpdateRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/viewroom/${id}`, { withCredentials: true });
                const room = response.data;
                setValue('name', room.name);
                setValue('price', room.price);
                setValue('description', room.description);
                setValue('maxGuests', room.maxGuests);
                // Handle images if necessary, for now assuming text fields
            } catch (error) {
                console.error('Error fetching room:', error);
                toast.error('Failed to fetch room details');
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('description', data.description);
            formData.append('maxGuests', data.maxGuests);

            if (data.images && data.images.length > 0) {
                for (let i = 0; i < data.images.length; i++) {
                    formData.append('images', data.images[i]);
                }
            }

            await axios.put(`http://localhost:5000/api/admin/update-room/${id}`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Room updated successfully');
            navigate('/admin/rooms');
        } catch (error) {
            console.error('Error updating room:', error);
            toast.error('Failed to update room');
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading room details...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/admin/rooms')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Rooms
                </button>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Update Room</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                            <input
                                {...register('name', { required: 'Room name is required' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="e.g. Deluxe Ocean View"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night ($)</label>
                                <input
                                    type="number"
                                    {...register('price', { required: 'Price is required', min: 0 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                                <input
                                    type="number"
                                    {...register('maxGuests', { required: 'Max guests is required', min: 1 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                                {errors.maxGuests && <p className="text-red-500 text-sm mt-1">{errors.maxGuests.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                {...register('description', { required: 'Description is required' })}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Describe the room features and amenities..."
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Update Images (Optional)</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                {...register('images')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload new images to replace existing ones</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm font-medium"
                            >
                                <Save size={20} />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateRoom;
