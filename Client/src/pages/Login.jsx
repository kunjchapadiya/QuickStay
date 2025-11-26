import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Facebook, Twitter, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        try {
            const res = await axios.post("http://localhost:5000/api/login", data);
            toast.success(res.data.message || "Login successful!");

            // Update Auth Context
            if (res.data.token && res.data.user) {
                login(res.data.user, res.data.token);
            }

            if (res.data.user.role === 'admin') {
                navigate("/admin/");
            } else {
                navigate("/");
            }
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.message || "Server error");
            }
            else {
                toast.error("Something went wrong");
            }
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 my-20">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 relative hidden md:block">
                    <img
                        src="/images/img1.avif"
                        alt="Login Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12 text-white">
                        <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>
                            Welcome Back
                        </h2>
                        <p className="text-lg font-light opacity-90">
                            Sign in to access your bookings, manage your profile, and explore exclusive offers.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
                    {/* Decorative blob for mobile/small screens if needed, or just keep it clean */}

                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: `"Playfair Display", serif` }}>
                            Sign In
                        </h2>
                        <p className="text-gray-500 mb-10">
                            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
                        </p>

                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                        {...register("email", { required: true })}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-2">Email is required</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Password</label>
                                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">Forgot Password?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full h-12 pl-12 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                        {...register("password", { required: true })}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-2">Password is required</p>}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                            </div>

                            <button className="w-full h-14 bg-blue-900 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-800 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2">
                                Sign In
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <button className="flex items-center justify-center h-12 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                    <Chrome size={20} className="text-gray-600" />
                                </button>
                                <button className="flex items-center justify-center h-12 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                    <Facebook size={20} className="text-blue-600" />
                                </button>
                                <button className="flex items-center justify-center h-12 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                    <Twitter size={20} className="text-blue-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
