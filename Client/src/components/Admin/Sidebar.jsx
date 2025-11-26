import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BedDouble,
    CalendarCheck,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
        { path: '/admin/rooms', icon: <BedDouble size={20} />, label: 'Manage Rooms' },
        { path: '/admin/bookings', icon: <CalendarCheck size={20} />, label: 'Bookings' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
        { path: '/admin/payments', icon: <DollarSign size={20} />, label: 'Payments' },
        // { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <div className={`
        fixed top-0 left-0 h-screen bg-gray-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo / Header */}
                    <div className="p-6 border-b border-gray-800">
                        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
                        <p className="text-sm text-gray-400">Resort Management</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 py-6 px-4 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                onClick={() => setIsOpen(false)} // Close on mobile click
                                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                `}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
