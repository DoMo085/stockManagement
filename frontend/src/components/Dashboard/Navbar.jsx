import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';
import { FaTachometerAlt, FaBox, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar({ username = "Admin" }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <aside className="sidebar">
            <div className="profile">
                <img src="/stock.jpg" alt="User" />
                <span>{username}</span>
            </div>

            <h2>Stock Manager</h2>
            <ul className="nav-list">
                <li className={isActive('/dashboard')}>
                    <Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link>
                </li>
                <li className={isActive('/item')}>
                    <Link to="/items"><FaBox /> Items</Link>
                </li>
                <li className={isActive('/settings')}>
                    <Link to="/settings"><FaCog /> Settings</Link>
                </li>
                <li className="logout-link">
                    <Link to="/logout"><FaSignOutAlt /> Logout</Link>
                </li>
            </ul>
        </aside>
    );
}
