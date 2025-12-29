import requests
import json
import time

BASE_URL = "http://localhost:8000"

def log(msg, color="\033[94m"):
    print(f"{color}[TEST] {msg}\033[0m")

def check_status():
    res = requests.get(f"{BASE_URL}/defense/status")
    return res.json()

def trigger_threat():
    payload = {
        "text": "DROP TABLE users; --",
        "url": "http://malicious-site.com/exploit",
        "network_risk": "HIGH",
        "child_mode": False
    }
    res = requests.post(f"{BASE_URL}/immune-check", json=payload)
    return res.json()

def trigger_benign():
    payload = {
        "text": "Hello world, this is a safe message.",
        "url": "http://google.com",
        "network_risk": "LOW",
        "child_mode": False
    }
    res = requests.post(f"{BASE_URL}/immune-check", json=payload)
    return res.json()

def reset_defense():
    res = requests.post(f"{BASE_URL}/defense/reset")
    return res.json()

def get_report():
    res = requests.get(f"{BASE_URL}/defense/report")
    return res.json()

def run_verification():
    log("1. Checking Initial Status...")
    status = check_status()
    print(f"Status: {status['mode']}")
    if status['mode'] != "NORMAL":
        log("System not in NORMAL state. Resetting...", "\033[93m")
        reset_defense()

    log("\n2. Triggering HIGH RISK Threat...")
    result = trigger_threat()
    print(f"Immune Action: {result['immuneAction']['mode']}")
    
    log("\n3. Checking Persistence (Immediate)...")
    status = check_status()
    print(f"Status: {status['mode']} (Expected: ACTIVE_DEFENSE)")
    
    log("\n4. Sending BENIGN Request (Should still be blocked/monitored)...")
    result = trigger_benign()
    print(f"Immune Action for Benign Req: {result['immuneAction']['mode']}")
    print(f"Note: {result.get('immuneAction', {}).get('note', '')}")

    log("\n5. Generating Defense Report...")
    report = get_report()
    print(json.dumps(report, indent=2))

    log("\n6. Resetting System...")
    reset_defense()
    status = check_status()
    print(f"Status After Reset: {status['mode']}")

if __name__ == "__main__":
    try:
        run_verification()
    except Exception as e:
        print(f"Error: {e}")
