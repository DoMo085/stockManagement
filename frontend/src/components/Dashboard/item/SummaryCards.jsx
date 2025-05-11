import React from 'react';


export default function SummaryCards({ items, salesData, transactions }) {
    const totalProducts = items.reduce((acc, item) => acc + item.quantity, 0);
    const lowStockCount = items.filter(item => item.quantity < 10).length;
    const today = new Date().toISOString().slice(0, 10);

    const totalSales = {
        daily: salesData.filter(s => s.date === today).reduce((acc, s) => acc + s.amount, 0),
        weekly: salesData.reduce((acc, s) => acc + s.amount, 0), // Simplified
        monthly: salesData.reduce((acc, s) => acc + s.amount, 0), // Simplified
    };

    return (
        <>
            <div className="recent-txn">
                <div className="recent">
                    📦 <strong>Total Stock:</strong> {totalProducts}
                </div>
                <div className="recent">
                    💰 <strong>Today's Sales:</strong> ${totalSales.daily.toFixed(2)}
                </div>
                <div className="recent">
                    📉 <strong>Low Stock Items:</strong> {lowStockCount}
                </div>
            </div>
            <div>
                <div className="transaction">
                    <strong>Recent Transactions:</strong>
                    <ul>
                        {transactions.slice(0, 3).map((tx, index) => (
                            <li key={index} className="list-txn recent-txn">
                                <span style={{flex: 1, fontWeight: "500", textTransform: "capitalize"}}>{tx.type}</span>
                                <span style={{flex: 2}}>{tx.itemName}</span>
                                <span style={{
                                    flex: 1,
                                    textAlign: "right",
                                    color: "green",
                                    fontWeight: "bold"
                                }}>${tx.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </>

    )
        ;
}
