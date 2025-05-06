import React, { useState } from "react";

// Sample stock data
const initialStocks = [
  { id: 1, name: "Apple", quantity: 100, price: 180 },
  { id: 2, name: "Google", quantity: 50, price: 150 },
];

function Dashboard() {
  const [stocks, setStocks] = useState(initialStocks);
  const [newStock, setNewStock] = useState({ name: "", quantity: 0, price: 0 });

  const addStock = () => {
    const id = Date.now();
    setStocks([...stocks, { id, ...newStock }]);
    setNewStock({ name: "", quantity: 0, price: 0 });
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Stock Management Dashboard</h1>

      {/* Add Stock */}
      <div className="mb-4 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add Stock</h2>
        <input
          placeholder="Name"
          value={newStock.name}
          onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
          className="mr-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newStock.quantity}
          onChange={(e) => setNewStock({ ...newStock, quantity: Number(e.target.value) })}
          className="mr-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Price"
          value={newStock.price}
          onChange={(e) => setNewStock({ ...newStock, price: Number(e.target.value) })}
          className="mr-2 p-2 border"
        />
        <button onClick={addStock} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      {/* Stock List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">📊 Stock List</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="p-2 border">{stock.name}</td>
                <td className="p-2 border">{stock.quantity}</td>
                <td className="p-2 border">${stock.price}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteStock(stock.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {stocks.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 p-4">
                  No stock available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
