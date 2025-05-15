import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';
import {
    FaTachometerAlt, FaBox, FaCog, FaSignOutAlt,
    FaUsers, FaTruck, FaChartBar, FaBars, FaTimes
} from 'react-icons/fa';

export default function Navbar({ username = "Admin" }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true); // sidebar toggle

    const navItems = [
        { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
        { label: "Items", path: "/items", icon: <FaBox /> },
        { label: "Users", path: "/users", icon: <FaUsers /> },
        { label: "Suppliers", path: "/suppliers", icon: <FaTruck /> },
        { label: "Reports", path: "/reports", icon: <FaChartBar /> },
        { label: "Settings", path: "/settings", icon: <FaCog /> }
    ];

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <>
            <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="profile">
                    <img src="/stock.jpg" alt="User" />
                    <span>{username}</span>
                </div>

                <h2>Stock Manager</h2>
                <ul className="nav-list">
                    {navItems.map((item, index) => (
                        <li key={index} className={isActive(item.path)}>
                            <Link to={item.path}>
                                {item.icon} {isOpen && item.label}
                            </Link>
                        </li>
                    ))}
                    <li className="logout-link">
                        <Link to="/logout"><FaSignOutAlt /> {isOpen && "Logout"}</Link>
                    </li>
                </ul>
            </aside>
        </>
    );
}
