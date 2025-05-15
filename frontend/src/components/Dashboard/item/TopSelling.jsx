import React from 'react';

export default function TopSelling({ salesData }) {
    // Aggregate sales by product
    const totals = salesData.reduce((acc, sale) => {
        acc[sale.itemName] = (acc[sale.itemName] || 0) + sale.quantity;
        return acc;
    }, {});

    // Convert to array and sort by highest quantity
    const sorted = Object.entries(totals)
        .map(([item, qty]) => ({ item, qty }))
        .sort((a, b) => b.qty - a.qty)
        ;

    return (

        <div className="card">
            <h3>🏆 Top Selling Products</h3>
            <ul>
                {sorted.map((product, i) => (
                    <li key={i}>{product.item} – {product.qty} sold</li>
                ))}
            </ul>
        </div>
    );
}
