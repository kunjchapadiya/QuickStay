import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddRoom = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

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

            await axios.post('http://localhost:5000/api/admin/create-room', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            toast.success('Room created successfully')
            navigate('/admin/rooms')
        } catch (error) {
            toast.error('Error creating room')
            console.error(error)
        }
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 m-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Room</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
                <div>
                    <input
                        type="text"
                        placeholder='Room Name'
                        {...register('name', { required: "Name is required" })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <input
                        type="number"
                        placeholder='Price per Night'
                        {...register('price', { required: "Price is required" })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                    <textarea
                        placeholder='Description'
                        {...register('description')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        {...register('images')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Select multiple images to upload</p>
                </div>

                <div>
                    <input
                        type="number"
                        placeholder='Max Guests'
                        {...register('maxGuests')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <button
                    type='submit'
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Room
                </button>
            </form>
        </div>
    )
}

export default AddRoom