import React from 'react';

export default function CategoryChart({ items }) {
    const categoryCounts = items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.quantity;
        return acc;
    }, {});

    return (
        <div className="category-breakdown">
            <h3>📊 Category Breakdown</h3>
            {Object.entries(categoryCounts).map(([cat, qty], i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                    <strong>{cat}</strong>
                    <div style={{
                        height: '10px',
                        background: '#ccc',
                        position: 'relative',
                        marginTop: '5px',
                        borderRadius: '5px'
                    }}>
                        <div style={{
                            width: `${qty}%`,
                            height: '100%',
                            background: '#007bff',
                            borderRadius: '5px'
                        }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
