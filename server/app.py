from flask import Flask, request, jsonify
import subprocess
import json
import os

app = Flask(__name__)
CONFIG_PATH = '../data/config.json'

# Load config
def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)

@app.route("/api/config", methods=["GET"])
def get_config():
    return jsonify(load_config())

@app.route("/api/broadcast", methods=["POST"])
def broadcast_message():
    data = request.json
    grid = data.get("grid")
    message = data.get("message")
    config = load_config()
    rcon_pw = config.get("rcon_password", "changeme")
    rcon_port_start = config.get("rcon_port_start", 35710)
    grid_map = {
        "A1": 35710, "B1": 35711, "C1": 35712, "D1": 35713, "E1": 35714,
        "A2": 35715, "B2": 35716, "C2": 35717, "D2": 35718, "E2": 35719,
        "A3": 35720, "B3": 35721, "C3": 35722, "D3": 35723, "E3": 35724,
        "A4": 35725, "B4": 35726, "C4": 35727, "D4": 35728, "E4": 35729,
        "A5": 35730, "B5": 35731, "C5": 35732, "D5": 35733, "E5": 35734
    }
    port = grid_map.get(grid, rcon_port_start)
    cmd = f'mcrcon -H 127.0.0.1 -P {port} -p {rcon_pw} broadcast "{message}"'
    subprocess.Popen(cmd, shell=True)
    return jsonify({"status": "sent", "grid": grid})

@app.route("/api/start/<grid>", methods=["GET"])
def start_grid(grid):
    script = load_config().get("batch_file", "Start_5x5_custom.bat")
    subprocess.Popen([script, grid], shell=True)
    return jsonify({"status": "started", "grid": grid})

@app.route("/api/stop/<grid>", methods=["GET"])
def stop_grid(grid):
    # Placeholder: add stop logic here if implemented
    return jsonify({"status": "stop not implemented", "grid": grid})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
