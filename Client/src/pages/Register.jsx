import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Facebook, Twitter, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import axios from "axios";
import { useAuth } from '../context/AuthContext';
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();



    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/register",
                data
            );

            toast.success(res.data.message || "Account created successfully!");

            // Auto login after register
            if (res.data.token && res.data.user) {
                login(res.data.user, res.data.token);
            }

            reset();

        } catch (error) {
            console.log(error);

            if (error.response) {
                toast.error(error.response.data.message || "Server error");
            } else {
                toast.error("Something went wrong");
            }
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 my-20">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse min-h-[700px]">

                {/* Right Side */}
                <div className="w-full md:w-1/2 relative hidden md:block">
                    <img src="/images/img2.avif" alt="Register Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12 text-white">
                        <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: `"Playfair Display", serif` }}>
                            Join Our Community
                        </h2>
                        <p className="text-lg font-light opacity-90">
                            Create an account to unlock exclusive benefits and personalized experiences.
                        </p>
                    </div>
                </div>

                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">

                        <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: `"Playfair Display", serif` }}>
                            Create Account
                        </h2>
                        <p className="text-gray-500 mb-10">
                            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
                        </p>

                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        {...register("username", { required: "Full Name is required" })}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                    />
                                </div>
                                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" }
                                        })}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                                        })}
                                        className="w-full h-12 pl-12 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-center gap-2">
                                <input type="checkbox" {...register("terms", { required: "You must accept terms" })} className="w-4 h-4" />
                                <label className="text-sm text-gray-600">I agree to the Terms & Privacy Policy</label>
                            </div>
                            {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full h-14 bg-blue-900 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-800 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Create Account
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        {/* Social Buttons */}
                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or register with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <button className="flex items-center justify-center h-12 border-2 border-gray-100 rounded-xl hover:bg-gray-50">
                                    <Chrome size={20} className="text-gray-600" />
                                </button>
                                <button className="flex items-center justify-center h-12 border-2 border-gray-100 rounded-xl hover:bg-gray-50">
                                    <Facebook size={20} className="text-blue-600" />
                                </button>
                                <button className="flex items-center justify-center h-12 border-2 border-gray-100 rounded-xl hover:bg-gray-50">
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

export default Register;
