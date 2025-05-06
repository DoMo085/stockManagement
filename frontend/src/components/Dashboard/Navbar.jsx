// src/Navbar.jsx
import React from 'react';
import './dashboard.css'; // Ensure it contains sidebar styles

export default function Navbar() {
  return (
    <aside className="sidebar">
      <h2>My App</h2>
      <ul>
        <li>Dashboard</li>
        <li>Items</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </aside>
  );
}
