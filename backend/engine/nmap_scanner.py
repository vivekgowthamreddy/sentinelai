import subprocess

SAFE_NMAP_FLAGS = [
    "-F",        # Fast scan (top ports)
    "-T4",       # Reasonable timing
    "--open"     # Show only open ports
]

def run_nmap_scan(target: str):
    try:
        command = ["nmap"] + SAFE_NMAP_FLAGS + [target]
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=30
        )

        return parse_nmap_output(result.stdout)

    except Exception as e:
        return {
            "error": str(e)
        }


def parse_nmap_output(output: str):
    open_ports = []

    for line in output.splitlines():
        if "/tcp" in line and "open" in line:
            parts = line.split()
            open_ports.append({
                "port": parts[0],
                "service": parts[2] if len(parts) > 2 else "unknown"
            })

    risk_level = "LOW"
    if len(open_ports) > 5:
        risk_level = "HIGH"
    elif len(open_ports) > 0:
        risk_level = "MEDIUM"

    return {
        "openPorts": open_ports,
        "portCount": len(open_ports),
        "networkRiskLevel": risk_level
    }
