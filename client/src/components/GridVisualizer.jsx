import React, { useEffect, useState } from 'react';
import './GridVisualizer.css';

const GRID_ROWS = ['A', 'B', 'C', 'D', 'E'];
const GRID_COLS = ['1', '2', '3', '4', '5'];

const getGridId = (row, col) => row + col;

const mockGridStatus = {
  C3: { status: 'online', type: 'Freeport', players: 3 },
  A5: { status: 'online', type: 'Powerstone', players: 0 },
  E2: { status: 'online', type: 'PvP', players: 7 },
  C5: { status: 'online', type: 'Kraken', players: 1 },
  D5: { status: 'online', type: 'MaxShips', players: 2 },
  B5: { status: 'online', type: 'MaxTames', players: 0 }
};

export default function GridVisualizer() {
  const [gridData, setGridData] = useState({});

  useEffect(() => {
    // TODO: Replace mock with fetch('/api/grid-status')
    setGridData(mockGridStatus);
  }, []);

  return (
    <div>
      <h2>ATLAS Grid Visualizer</h2>
      <div className="grid-map">
        {GRID_ROWS.map(row => (
          <div className="grid-row" key={row}>
            {GRID_COLS.map(col => {
              const id = getGridId(row, col);
              const cell = gridData[id] || {};
              const status = cell.status || 'offline';
              const type = cell.type || '';
              const players = cell.players || 0;
              return (
                <div
                  key={id}
                  className={`grid-cell ${status}`}
                  title={`${id}: ${type} (${players} players)`}
                >
                  {id}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
