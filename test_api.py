import requests
import json

# Test /analyze endpoint
print("Testing /analyze endpoint...")
analyze_data = {
    "text": "Click here to win $1000000!",
    "url": "",
    "network_risk": "HIGH",
    "child_mode": True
}

try:
    response = requests.post("http://localhost:8000/analyze", json=analyze_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*50 + "\n")

# Test /immune-check endpoint
print("Testing /immune-check endpoint...")
try:
    response = requests.post("http://localhost:8000/immune-check", json=analyze_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*50 + "\n")

# Test /password-check endpoint
print("Testing /password-check endpoint...")
password_data = {
    "password": "weak123"
}

try:
    response = requests.post("http://localhost:8000/password-check", json=password_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
