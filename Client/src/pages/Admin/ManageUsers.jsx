import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/admin/viewusers",
                { withCredentials: true }
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete-user/${id}`,
                { withCredentials: true }
            );
            toast.success("User deleted successfully!");
            fetchUsers();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete user");
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        reset({
            name: user.name || user.username || '',
            email: user.email,
            role: user.role
        });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/update-user/${editingUser._id}`,
                data,
                { withCredentials: true }
            );
            toast.success("User updated successfully!");
            handleModalClose();
            fetchUsers();
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update user");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="font-normal text-gray-600 border-b border-gray-200">
                            <th className="p-3">Username</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3">{user.name || user.username}</td>
                                    <td className="p-3">{user.email}</td>

                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "admin"
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-blue-100 text-blue-700"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                onClick={() => handleEditClick(user)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit User</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Role
                                </label>
                                <select
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    {...register("role")}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="employee">Employee</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
