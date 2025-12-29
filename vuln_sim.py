import socket
import threading
import time

def start_vuln_server(port=9999):
    """
    Opens a listening port to simulate a vulnerability (Backdoor).
    """
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        server.bind(('0.0.0.0', port))
        server.listen(5)
        print(f"\n[!] VULNERABILITY ACTIVATED: unauthorized_listener running on port {port}")
        print(f"[!] SYSTEM COMPROMISED. Waiting for connection...")
        
        while True:
            client, addr = server.accept()
            print(f"[*] Connection received from {addr}")
            client.send(b"WARNING: UNAUTHORIZED BACKDOOR ACTIVE\n")
            client.close()
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        server.close()

if __name__ == "__main__":
    print("-" * 50)
    print("   SENTINEL AI - DEMO VULNERABILITY SIMULATOR")
    print("-" * 50)
    print("This script simulates a trojan/backdoor opening a high-risk port.")
    print("Keep this window OPEN during the demo.")
    print("-" * 50)
    start_vuln_server()
