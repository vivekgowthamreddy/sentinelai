import requests
import json

code_snippet = r'''import hashlib
import os
import sys

def calculate_file_hash(file_path):
    """Calculate SHA-256 hash of a file."""
    sha256 = hashlib.sha256()
    try:
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                sha256.update(chunk)
        return sha256.hexdigest()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
    except PermissionError:
        print(f"Error: Permission denied for '{file_path}'.")
        sys.exit(1)

def verify_integrity(file_path, expected_hash):
    """Verify if file hash matches the expected hash."""
    current_hash = calculate_file_hash(file_path)
    if current_hash == expected_hash:
        print("✅ File integrity verified. No tampering detected.")
    else:
        print("⚠️ WARNING: File integrity check failed! Possible tampering detected.")
        print(f"Expected: {expected_hash}")
        print(f"Found:    {current_hash}")

if __name__ == "__main__":
    # Path to the script you want to protect
    script_path = os.path.abspath(__file__)

    # Precomputed hash of the original file (calculate once and store securely)
    ORIGINAL_HASH = "replace_with_original_sha256_hash"

    if ORIGINAL_HASH == "replace_with_original_sha256_hash":
        print("Please set ORIGINAL_HASH to the known good hash of this file.")
        print("Run this once to get it:")
        print(f"python {os.path.basename(__file__)} --get-hash")
        sys.exit(0)

    # Optional: allow hash generation mode
    if "--get-hash" in sys.argv:
        print("SHA-256 hash of this file is:")
        print(calculate_file_hash(script_path))
        sys.exit(0)

    # Verify integrity
    verify_integrity(script_path, ORIGINAL_HASH)'''

def analyze_code():
    url = "http://localhost:8000/api/code-analyze"
    payload = {"code": code_snippet, "language": "python"}
    
    try:
        response = requests.post(url, json=payload)
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_code()
