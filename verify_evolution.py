import requests
import json
import time

BASE_URL = "http://localhost:8000"

def check_status():
    res = requests.get(f"{BASE_URL}/defense/status")
    return res.json()

def evolve():
    res = requests.post(f"{BASE_URL}/defense/evolve")
    return res.json()

def reset():
    requests.post(f"{BASE_URL}/defense/reset")

def navigate(url):
    res = requests.post(f"{BASE_URL}/browser/navigate", json={"url": url})
    return res.json()

def run_test():
    print("--- SYSTEM EVOLUTION VERIFICATION ---")
    
    # 0. Reset
    reset()
    print("[0] System Reset. Level: 0")

    # 1. Level 0 Check
    status = check_status()
    print(f"    Current Level: {status['evolution_level']}")
    res = navigate("http://malware-test.com")
    print(f"    Access 'http://malware-test.com': {res['status']} (Expected: ALLOWED)")

    # 2. Evolve to Level 1
    print("\n[1] Evolving to Level 1 (Heuristics)...")
    evolve()
    res = navigate("http://malware-test.com")
    print(f"    Access 'http://malware-test.com': {res['status']} (Expected: BLOCKED)")
    
    res = navigate("http://google.com")
    print(f"    Access 'http://google.com':       {res['status']} (Expected: ALLOWED)")

    # 3. Evolve to Level 3 (Lockdown)
    print("\n[2] Evolving to Level 3 (Lockdown)...")
    evolve() # Level 2
    evolve() # Level 3
    
    status = check_status()
    print(f"    Current Level: {status['evolution_level']}")

    res = navigate("http://unknown-site.com")
    print(f"    Access 'http://unknown-site.com': {res['status']} (Expected: BLOCKED - Not Whitelisted)")

    res = navigate("http://google.com")
    print(f"    Access 'http://google.com':       {res['status']} (Expected: ALLOWED - Whitelisted)")

    # 4. Cleanup
    print("\n[3] test Complete. Resetting...")
    reset()

if __name__ == "__main__":
    run_test()
