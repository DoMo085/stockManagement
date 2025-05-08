import React from 'react';

function Total({ items = [] }) {
  const totalProducts = items.length;
  const lowStock = items.filter(item => item.quantity > 0 && item.quantity < 10).length;
  const outOfStock = items.filter(item => item.quantity === 0).length;

  const topSeller =
    [...items]
      .filter(item => item.sales > 0)
      .sort((a, b) => b.sales - a.sales)[0]?.name || "N/A";

  return (
    <div className="cards fade-in">
      <div className="card">
        <h3><i className="fas fa-cubes"></i> Total Products</h3>
        <p>{totalProducts}</p>
      </div>
      <div className="card">
        <h3><i className="fas fa-exclamation-triangle"></i> Low Stock</h3>
        <p>{lowStock}</p>
      </div>
      <div className="card">
        <h3><i className="fas fa-times-circle"></i> Out of Stock</h3>
        <p>{outOfStock}</p>
      </div>
      <div className="card">
        <h3><i className="fas fa-star"></i> Top Seller</h3>
        <p>{topSeller}</p>
      </div>
    </div>
  );
}

export default Total;
