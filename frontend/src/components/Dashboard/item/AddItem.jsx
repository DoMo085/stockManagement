import React, { useState } from 'react';
import CreateItemModal from '.././CreateItemModal';



function AddItem(data) {
  const [items, setItems] = useState(data);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleAddItem = (newItem) => {
        const nextId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
        const itemWithId = { ...newItem, id: nextId };
        setItems(prev => [...prev, itemWithId]);
        window.alert(`Item "${itemWithId.name}" was added successfully.`);
    };

    return (<>
        <button className="add-button" onClick={() => setShowCreateModal(true)}>
            <img className='icon' src="add.png" alt="" /> Add Item
        </button>

        {showCreateModal && (
        <CreateItemModal
          onClose={() => setShowCreateModal(false)}
          onAddItem={handleAddItem}
        />
      )}
    </>)
}
export default AddItem;