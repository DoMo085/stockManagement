// src/Navbar.jsx
import React from 'react';
import './dashboard.css'; // Ensure it contains sidebar styles

export default function Navbar(prop) {
  return (
    <aside className="sidebar">
      <div class="profile">
        <img src="stock.jpg" alt="User"/>
        <span>{prop.username}</span>
      </div>

      <h2>My App</h2>
      <ul>
        <li>Dashboard</li>
        <li>Items</li>
        <li>Settings</li>
        <li>Logout</li>
        <li></li>
      </ul>
      <a href="#" class="log-out-btn"><i ></i> Logout</a> 
    </aside>
  );
}
