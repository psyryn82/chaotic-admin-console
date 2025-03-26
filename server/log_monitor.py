import os
import time
from datetime import datetime
from ai_analyzer import analyze_log

# Change this to your ShooterGame path
SERVER_PATH = "D:/Server/ShooterGame/Saved"
GRID_IDS = [f"{row}{col}" for row in "ABCDE" for col in "12345"]

seen_logs = {}

def scan_logs():
    for grid in GRID_IDS:
        log_dir = os.path.join(SERVER_PATH, grid, "Logs")
        if not os.path.exists(log_dir):
            continue
        for filename in os.listdir(log_dir):
            if not filename.endswith(".log") and not filename.endswith(".crashstack"):
                continue
            full_path = os.path.join(log_dir, filename)
            mod_time = os.path.getmtime(full_path)
            if full_path not in seen_logs or seen_logs[full_path] < mod_time:
                seen_logs[full_path] = mod_time
                with open(full_path, "r", errors="ignore") as f:
                    log_text = f.read()
                summary = analyze_log(log_text)
                print(f"--- {grid} - {filename} ---")
                print(summary)
                print()

if __name__ == "__main__":
    print("🔍 AI Log Monitor started.")
    while True:
        scan_logs()
        time.sleep(30)
