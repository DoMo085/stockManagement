import React, { useState } from 'react';
import CreateItemModal from './CreateItemModal';
import EditItemModal from './EditItemModal';
import Navbar from './Navbar';
import './dashboard.css';

const initialData = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999, quantity: 12, img: 'stock.jpg' },
  { id: 2, name: 'Desk Chair', category: 'Furniture', price: 199, quantity: 5, img: 'stock.jpg' },
  { id: 3, name: 'Smartphone', category: 'Electronics', price: 799, quantity: 20, img: 'stock.jpg' },
  { id: 4, name: 'Notebook', category: 'Stationery', price: 5, quantity: 100, img: 'stock.jpg' },
];

export default function Dashboard() {
  const [items, setItems] = useState(initialData);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  // const handleAddItem = (newItem) => {
  //   setItems(prev => [...prev, newItem]);
  //   window.alert(`Item "${newItem.name}" was added successfully.`);
  // };
  
  const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = (newItem) => {
    const nextId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const itemWithId = { ...newItem, id: nextId };
    setItems(prev => [...prev, itemWithId]);
    window.alert(`Item "${itemWithId.name}" was added successfully.`);
  };


  return (
    <div className="layout">
      <Navbar />

      <main className="main-content">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>

          <div className="dashboard-actions">
         

            {/* <button className="add-button" onClick={() => setIsModalOpen(true)}>
              <img className="icon" src="add.png" alt="" /> Add Item
            </button> */}
            <button className="add-button" onClick={() => setShowCreateModal(true)}>
              <img className='icon' src="add.png" alt="" /> Add Item
            </button>

            <input type="text" placeholder="Search items..." value={search}  onChange={(e) => setSearch(e.target.value)}
              className="search-bar"
            />
            
          </div>
          {items.some(item => item.quantity < 10) && (
            <div className="low-stock-alert">
              ⚠️ Some items are low in stock!
            </div>
          )}

          <table className="item-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price ($)</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className={item.quantity < 10 ? "low-stock" : ""}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td><img className="item-image" src={item.img} alt="item" /></td>
                  <td className="action" >
                    <button className="edit-button" onClick={() => setEditingItem(item)}>Edit <img className='icon' id="edit-icon"src="edit.png" alt="edit.png" /> </button>
                    <button className="delete-button" onClick={() => deleteItem(item.id)}>Delete  <img className='icon' id="edit-icon"src="delete.png" alt="edit.png" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="inventory-summary">
            <strong>Total Inventory Value: </strong> ${totalValue.toLocaleString()}
          </div>
        </div>
      </main>
      {/* Conditionally render the Create Item Modal */}
      {showCreateModal && (
        <CreateItemModal
          onClose={() => setShowCreateModal(false)}
          onAddItem={handleAddItem}
        />
      )}

      
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdateItem={(updatedItem) => {
            setItems(prev =>
              prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
            );
          }}
        />
      )}


    </div>
  );
}
