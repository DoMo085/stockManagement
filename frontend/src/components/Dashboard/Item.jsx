import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Item.css'; // Optional for styling

export default function Item({  }) {
    const getStatusClass = (qty) => {
        if (qty === 0) return 'out-of-stock';
        if (qty < 10) return 'low-stock';
        return 'in-stock';
    };

    return (
        <tr className={getStatusClass(item.quantity)}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.quantity}</td>
            <td>
                <img src={item.img} alt={item.name} className="item-image" />
            </td>
            <td className="action-buttons">
                <button className="edit-btn" onClick={() => onEdit(item)}>
                    <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(item.id)}>
                    <FaTrash /> Delete
                </button>
            </td>
        </tr>
    );
}
