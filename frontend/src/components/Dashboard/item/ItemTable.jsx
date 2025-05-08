import React, { useState } from 'react';
import EditItemModal from '.././EditItemModal';

function ItemTable({ initialData }){
    const [items, setItems] = useState(initialData);
    const [search, setSearch] = useState("");

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    const [editingItem, setEditingItem] = useState(null);
    const deleteItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return(
        <>
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
                <button className="edit-button" onClick={() => setEditingItem(item)}>Edit <img className='icon' id="edit-icon" src="edit.png" alt="edit.png" /> </button>
                <button className="delete-button" onClick={() => deleteItem(item.id)}>Delete  <img className='icon' id="edit-icon" src="delete.png" alt="edit.png" /></button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
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
     </>
    )
}
export default ItemTable;