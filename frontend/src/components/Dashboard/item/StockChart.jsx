import React, { useEffect, useRef } from 'react';

function StockChart({ items }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance if any
    if (window.myChart) {
      window.myChart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    // Example: use item names and their quantities
    const labels = items.map(item => item.name);
    const data = items.map(item => item.quantity);

    window.myChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Stock Quantity',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantity'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Product Name'
            }
          }
        }
      }
    });
  }, [items]);

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h3>📊 Stock Levels</h3>
      <canvas ref={chartRef} height="100"></canvas>
    </div>
  );
}

export default StockChart;
