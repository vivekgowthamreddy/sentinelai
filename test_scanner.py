import requests
import json
import time

def test_scan():
    url = "http://localhost:8000/api/network-scan" # The frontend uses /api/network-scan prefix usually, but let's check app.py routes.
    # app.py has @app.post("/network-scan") and @app.post("/api/network-scan")
    
    payload = {"target": "google.com"}
    print(f"Testing {url} with {payload}...")
    
    try:
        start = time.time()
        response = requests.post(url, json=payload, timeout=30)
        end = time.time()
        
        print(f"Status: {response.status_code}")
        print(f"Time: {end - start:.2f}s")
        print("Response:")
        print(json.dumps(response.json(), indent=2))
        
        if response.status_code == 200 and "openPorts" in response.json():
            print("\nSUCCESS: Scan completed and returned ports.")
        else:
            print("\nFAILURE: Unexpected response.")
            
    except Exception as e:
        print(f"\nERROR: {e}")

if __name__ == "__main__":
    test_scan()
