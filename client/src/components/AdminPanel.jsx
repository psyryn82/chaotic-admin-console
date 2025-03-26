import React, { useState } from 'react';

export default function AdminPanel() {
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedGrid, setSelectedGrid] = useState('C3');
  const [config, setConfig] = useState(null);

  const handleBroadcast = () => {
    fetch('/api/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grid: selectedGrid, message: broadcastMessage })
    }).then(() => alert('Message sent!'));
  };

  const handleStartServer = () => {
    fetch(`/api/start/${selectedGrid}`).then(() => alert(`Start signal sent to ${selectedGrid}`));
  };

  const handleStopServer = () => {
    fetch(`/api/stop/${selectedGrid}`).then(() => alert(`Stop signal sent to ${selectedGrid}`));
  };

  const handleLoadConfig = () => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <label>Select Grid:</label>
      <select value={selectedGrid} onChange={e => setSelectedGrid(e.target.value)}>
        {['A1','B1','C1','D1','E1','A2','B2','C2','D2','E2','A3','B3','C3','D3','E3','A4','B4','C4','D4','E4','A5','B5','C5','D5','E5'].map(grid => (
          <option key={grid} value={grid}>{grid}</option>
        ))}
      </select>

      <div>
        <button onClick={handleStartServer}>Start Server</button>
        <button onClick={handleStopServer}>Stop Server</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Broadcast message"
          value={broadcastMessage}
          onChange={e => setBroadcastMessage(e.target.value)}
        />
        <button onClick={handleBroadcast}>Broadcast</button>
      </div>

      <div>
        <button onClick={handleLoadConfig}>Load Config</button>
        {config && <pre>{JSON.stringify(config, null, 2)}</pre>}
      </div>
    </div>
  );
}
