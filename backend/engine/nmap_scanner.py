import subprocess
import re


def run_nmap_scan(target: str) -> dict:
    """
    Runs a safe Nmap scan (no aggressive flags).
    Designed for educational and defensive analysis only.
    """

    try:
        # Safe scan: service detection + open ports
        command = [
            "nmap",
            "-sS",        # TCP SYN scan (standard)
            "-Pn",        # Skip host discovery
            "-T4",        # Reasonable speed
            "--top-ports", "100",
            target
        ]

        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=60
        )

        output = result.stdout

        open_ports = []
        for line in output.splitlines():
            if re.search(r"/tcp\s+open", line):
                parts = line.split()
                port = parts[0]
                service = parts[-1]
                open_ports.append({
                    "port": port,
                    "service": service
                })

        risk_level = (
            "HIGH" if len(open_ports) > 10
            else "MEDIUM" if len(open_ports) > 3
            else "LOW"
        )

        return {
            "target": target,
            "scanStatus": "SUCCESS",
            "openPorts": open_ports,
            "openPortCount": len(open_ports),
            "networkRiskLevel": risk_level
        }

    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        # FALLBACK: If nmap missing or timeout, run Python Socket Scan
        try:
            import socket
            open_ports = []
            # Scan top 20 common ports if nmap fails
            common_ports = [21, 22, 23, 25, 53, 80, 110, 135, 139, 143, 443, 445, 993, 995, 1723, 3306, 3389, 5900, 8080, 8443]
            
            for port in common_ports:
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(0.5)
                result = sock.connect_ex((target, port))
                if result == 0:
                    open_ports.append({"port": str(port), "service": "unknown"})
                sock.close()
            
            risk_level = (
                "HIGH" if len(open_ports) > 5
                else "MEDIUM" if len(open_ports) > 2
                else "LOW"
            )
            
            return {
                "target": target,
                "scanStatus": "SUCCESS (Fallback)",
                "openPorts": open_ports,
                "openPortCount": len(open_ports),
                "networkRiskLevel": risk_level,
                "note": "Nmap not found. Performed basic socket scan."
            }
        except Exception as fallback_err:
             return {
                "target": target,
                "scanStatus": "TIMEOUT",
                "message": "Scan took too long and fallback failed."
            }

    except Exception as e:
        return {
            "target": target,
            "scanStatus": "ERROR",
            "message": str(e)
        }
