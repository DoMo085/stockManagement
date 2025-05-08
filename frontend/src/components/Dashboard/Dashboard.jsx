import React, { useState } from 'react';
import Navbar from './Navbar';
import './dashboard.css';
import ItemTable from './item/ItemTable';
import AddItem from './item/AddItem';
import Total from './item/Total';
import StockChart from './item/StockChart';
const initialData = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999, quantity: 12, img: 'stock.jpg' },
  { id: 2, name: 'Desk Chair', category: 'Furniture', price: 199, quantity: 5, img: 'stock.jpg' },
  { id: 3, name: 'Smartphone', category: 'Electronics', price: 799, quantity: 20, img: 'stock.jpg' },
  { id: 4, name: 'Notebook', category: 'Stationery', price: 5, quantity: 100, img: 'stock.jpg' },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const usename = ["Nidet"];
  const [items, setItems] = useState(initialData);


  const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="layout">
      <Navbar username={usename} />

      <main className="main-content">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>
          <Total items={initialData} />
          <StockChart items={items} />
          <div className="dashboard-actions">
            <AddItem data ={items}/>
            <input type="text" placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="search-bar"
            />
          </div>

          {items.some(item => item.quantity < 10) && (
            <div className="low-stock-alert">
              ⚠️ Some items are low in stock!
            </div>
          )}

          <ItemTable initialData={initialData} />
          <div className="inventory-summary">
            <strong>Total Inventory Value: </strong> ${totalValue.toLocaleString()}
          </div>
        </div>
      </main>
    </div>
  );
}
