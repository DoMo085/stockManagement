import React, { useState } from 'react';
import Navbar from './Navbar';
import ItemTable from './item/ItemTable';
import AddItem from './item/AddItem';
import Total from './item/Total';
import StockChart from './item/StockChart';
import SummaryCards from './item/SummaryCards';
import CategoryChart from './item/CategoryChart';
import TopSelling from './item/TopSelling';
import ActivityLog from './item/ActivityLog';
import ExportData from './item/ExportData';
const activityLogs = [
  { timestamp: '2025-05-11 10:32', action: 'Sold', item: 'Laptop', details: 'Sale to Customer A' },
  { timestamp: '2025-05-10 14:05', action: 'Stocked', item: 'Desk Chair', details: 'Stock In' },
  { timestamp: '2025-05-09 16:00', action: 'Sold', item: 'Smartphone', details: 'Sale to Customer B' },
];
const initialData = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999, quantity: 12, img: 'stock.jpg' },
  { id: 2, name: 'Desk Chair', category: 'Furniture', price: 199, quantity: 5, img: 'stock.jpg' },
  { id: 3, name: 'Smartphone', category: 'Electronics', price: 799, quantity: 20, img: 'stock.jpg' },
  { id: 4, name: 'Notebook', category: 'Stationery', price: 5, quantity: 100, img: 'stock.jpg' },
];

const salesData = [
  { date: "2025-05-11", amount: 1200 },
  { date: "2025-05-10", amount: 750 },
  { date: "2025-05-09", amount: 400 },
];

const recentTransactions = [
  { type: 'Sale', itemName: 'Laptop', amount: 999 },
  { type: 'Stock In', itemName: 'Notebook', amount: 250 },
  { type: 'Sale', itemName: 'Desk Chair', amount: 199 },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(initialData);
  const username = "Nidet";
  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, { ...newItem, id: prevItems.length + 1 }]);
  };

  const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
      <div className="layout">
        <Navbar username={username} />

        <main className="main-content">
          <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <SummaryCards
                items={items}
                salesData={salesData}
                transactions={recentTransactions}
            />

            <ActivityLog logs={activityLogs} />

            <div className="cards fade-in">
              <CategoryChart items={items}/>
            </div>


            {/* Total Value + Chart */}
            <Total items={items}/>
            <StockChart items={items}/>

            {/* Add item and search */}
            <div className="dashboard-actions">
              <AddItem onAdd={handleAddItem}/>
              <input
                  type="text"
                  placeholder="Search items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-bar"
              />
            </div>

            {/* Low stock alert */}
            {items.some(item => item.quantity < 10) && (
                <div className="low-stock-alert">
                  ⚠️ Some items are low in stock!
                </div>
            )}

            {/* Item table */}
            <ExportData data={items} />
            <ItemTable initialData={filteredItems}/>

            {/* Inventory total */}
            <div className="inventory-summary">
              <strong>Total Inventory Value: </strong> ${totalValue.toLocaleString()}
            </div>
          </div>
        </main>
      </div>
  );
}
