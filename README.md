# 🌐 Chaotic Unified Admin Console

This is the full working version of the ATLAS control center.

---

## 🔧 Frontend Features (React)
- `/` Mobile Dashboard (countdown, grid summary)
- `/admin` Admin Panel (start/stop, config, broadcast)
- `/grid` Grid Visualizer (map view, roles, players)
- `/ai` AI Log Analyzer (auto summaries from logs)

## 🛠 Backend Features (Flask)
- `/api/config` — Returns live config.json
- `/api/broadcast` — Send RCON message
- `/api/start/<grid>` — Start batch script
- `/api/grid-status` — Online/offline + roles

## 🧠 AI Log Monitor
- `log_monitor.py` scans logs every 30s
- Uses `ai_analyzer.py` for crash summary

---

## 📦 Structure

- `client/` → React frontend
- `server/` → Flask + backend logic
- `data/` → Config, restart-time.json, logs

---

## ▶️ Running

### 1. Frontend
```bash
cd client
npm install
npm start
```

### 2. Backend
```bash
cd server
pip install flask
python app.py
```

### 3. AI Monitor (optional)
```bash
python log_monitor.py
```

---

Next: Push this folder to GitHub.
