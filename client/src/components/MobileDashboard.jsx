import React, { useEffect, useState } from 'react';
import './MobileDashboard.css';

export default function MobileDashboard() {
  const [restartTime, setRestartTime] = useState(null);
  const [grids, setGrids] = useState({});

  useEffect(() => {
    fetch('http://localhost:5050/api/grid-status')
      .then(res => res.json())
      .then(data => setGrids(data));

    fetch('http://localhost:5000/data/restart-time.json')
      .then(res => res.json())
      .then(data => setRestartTime(new Date(data.restart_time_utc)));
  }, []);

  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      if (restartTime) {
        const diff = Math.floor((restartTime - new Date()) / 1000);
        if (diff <= 0) {
          setCountdown('Restarting now...');
        } else {
          const m = Math.floor(diff / 60);
          const s = diff % 60;
          setCountdown(`${m}m ${s < 10 ? '0' : ''}${s}s`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [restartTime]);

  return (
    <div className="mobile-dashboard">
      <h2>Chaotic ATLAS Dashboard</h2>
      <div className="countdown">⏳ Restart in: {countdown}</div>
      <div className="grid-summary">
        {Object.entries(grids).map(([id, info]) => (
          <div key={id} className={`grid-card ${info.status}`}>
            <strong>{id}</strong>
            <div>{info.type}</div>
            <div>{info.players} players</div>
          </div>
        ))}
      </div>
    </div>
  );
}
