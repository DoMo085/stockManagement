import React, { useState } from 'react';
import './CreateItemModal.css';

const CreateItemModal = ({ onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    img: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.price && formData.quantity && formData.img) {
      onAddItem(formData);
      onClose();
    } else {
      alert("All fields must be filled out");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="delete-button" id='discard' onClick={onClose}>Discard</p>
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Add Item</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;
