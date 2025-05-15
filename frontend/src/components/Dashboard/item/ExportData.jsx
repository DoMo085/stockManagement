import React from 'react';

export default function ExportData({ data }) {
    const exportToCSV = () => {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(','));
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'inventory.csv';
        link.click();
    };

    return (
        <div className="export-excel">
            <h3>📤 Export Inventory</h3>
            <button onClick={exportToCSV} className="btn-export">Export to CSV</button>
        </div>
    );
}
