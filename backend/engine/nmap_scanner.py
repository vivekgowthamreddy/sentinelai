import socket
import concurrent.futures

# Top 20 common ports to scan for "Fast Scan" emulation
COMMON_PORTS = {
    20: "ftp-data", 21: "ftp", 22: "ssh", 23: "telnet", 25: "smtp",
    53: "dns", 80: "http", 110: "pop3", 135: "msrpc", 139: "netbios-ssn",
    143: "imap", 443: "https", 445: "microsoft-ds", 993: "imaps", 995: "pop3s",
    1723: "pptp", 3306: "mysql", 3389: "ms-wbt-server", 5900: "vnc", 8080: "http-proxy"
}

def scan_port(target_ip, port):
    """
    Scans a single port on the target IP.
    Returns the port number if open, None otherwise.
    """
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1.0)  # 1 second timeout per port
            result = s.connect_ex((target_ip, port))
            if result == 0:
                return port
    except Exception:
        pass
    return None

def run_nmap_scan(target: str):
    """
    Performs a simple TCP connect scan using native Python sockets.
    Replaces the external 'nmap' binary dependency.
    """
    # Clean the target (remove protocol if present)
    target = target.replace("http://", "").replace("https://", "").split("/")[0]

    try:
        # Resolve hostname to IP first
        target_ip = socket.gethostbyname(target)
    except socket.gaierror:
        return {"error": f"Could not resolve hostname: {target}"}
    except Exception as e:
        return {"error": str(e)}

    open_ports_list = []

    try:
        # Scan ports concurrently
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
            future_to_port = {executor.submit(scan_port, target_ip, port): port for port in COMMON_PORTS}
            
            for future in concurrent.futures.as_completed(future_to_port):
                port = future_to_port[future]
                if future.result():
                    open_ports_list.append({
                        "port": f"{port}/tcp",
                        "service": COMMON_PORTS[port]
                    })
        
        # Determine risk level
        risk_level = "LOW"
        if len(open_ports_list) > 5:
            risk_level = "HIGH"
        elif len(open_ports_list) > 0:
            risk_level = "MEDIUM"
        
        # Sort by port number
        open_ports_list.sort(key=lambda x: int(x["port"].split("/")[0]))

        return {
            "openPorts": open_ports_list,
            "portCount": len(open_ports_list),
            "networkRiskLevel": risk_level,
            "note": "Native Python Scan (Top 20 ports)"
        }

    except Exception as e:
        return {
            "error": str(e)
        }
