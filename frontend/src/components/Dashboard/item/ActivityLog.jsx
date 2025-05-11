import React from 'react';

export default function ActivityLog({ logs }) {
    return (
        <div className="log">
            <h3>🧍 Admin Activity Log</h3>
            <ul>
                {logs.slice(0, 5).map((log, i) => (
                    <div key={i} className="list-log">
                        <span>{log.timestamp}</span> — {log.action} <strong>{log.item}</strong> ({log.details})
                    </div>
                ))}
            </ul>
        </div>
    );
}
