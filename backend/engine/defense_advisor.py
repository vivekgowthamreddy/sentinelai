from typing import List, Dict, Any

class DefenseAdvisor:
    """
    Expert System to generate defense recommendations based on scan results.
    Maps open ports and identified services to actionable security advice.
    """

    @staticmethod
    def get_recommendations(scan_result: Dict[str, Any]) -> List[Dict[str, Any]]:
        recommendations = []
        open_ports = scan_result.get("openPorts", [])
        target = scan_result.get("target", "Target System")

        # 0. DEMO SPECIFIC: DETECT VULNERABILITY SIMULATOR
        for item in open_ports:
            if str(item.get("port", "")).startswith("9999"):
                recommendations.append({
                    "id": "CRT-9999",
                    "title": "Unauth Backdoor Detected",
                    "description": "Port 9999 is often used by trojans or unauthorized listeners. Immediate action required.",
                    "severity": "CRITICAL",
                    "impact": "Prevent remote code execution and full system compromise.",
                    "effort": "HIGH",
                    "command": "kill $(lsof -t -i:9999)"
                })

        # 1. GENERAL FIREWALL RULE
        if open_ports:
            recommendations.append({
                "id": "GEN-01",
                "title": "Enable Firewall Restrictions",
                "description": f"Multiple ports are open on {target}. Ensure a firewall (UFW/IPTables) is active and only necessary ports are allowed.",
                "severity": "HIGH",
                "impact": "Reduces attack surface by blocking unauthorized access.",
                "effort": "LOW",
                "command": "sudo ufw enable"
            })

        # 2. PORT-SPECIFIC RULES
        for item in open_ports:
            port_str = str(item.get("port", "")).lower()
            service = item.get("service", "").lower()
            
            # Extract port number if it's like "80/tcp"
            port_num = port_str.split('/')[0] if '/' in port_str else port_str

            # FTP
            if port_num == "21" or "ftp" in service:
                recommendations.append({
                    "id": "NET-21",
                    "title": "Secure FTP Access",
                    "description": "Port 21 (FTP) is unencrypted. Login credentials can be intercepted.",
                    "severity": "HIGH",
                    "impact": "Prevents credential theft.",
                    "effort": "MEDIUM",
                    "command": "Use SFTP (Port 22) instead of FTP."
                })

            # TELNET
            if port_num == "23" or "telnet" in service:
                recommendations.append({
                    "id": "NET-23",
                    "title": "Disable Telnet",
                    "description": "Telnet sends data in cleartext. Highly vulnerable to sniffing.",
                    "severity": "CRITICAL",
                    "impact": "Eliminates cleartext administration risks.",
                    "effort": "LOW",
                    "command": "sudo systemctl stop telnet"
                })

            # SSH
            if port_num == "22" or "ssh" in service:
                recommendations.append({
                    "id": "NET-22",
                    "title": "Harden SSH Configuration",
                    "description": "Ensure SSH disallows root login and uses key-based authentication.",
                    "severity": "MEDIUM",
                    "impact": "Prevents brute-force access to root.",
                    "effort": "MEDIUM",
                    "command": "Edit /etc/ssh/sshd_config: PermitRootLogin no"
                })

            # HTTP
            if port_num == "80" or "http" in service:
                if port_num != "443":
                    recommendations.append({
                        "id": "WEB-80",
                        "title": "Enforce HTTPS",
                        "description": "Port 80 indicates unencrypted HTTP traffic. Redirect to HTTPS.",
                        "severity": "MEDIUM",
                        "impact": "Encrypts data in transit.",
                        "effort": "MEDIUM",
                        "command": "Configure web server to redirect HTTP to HTTPS."
                    })

            # SMB/NetBIOS
            if port_num in ["139", "445"] or "smb" in service.lower():
                recommendations.append({
                    "id": "WIN-SMB",
                    "title": "Restrict SMB Access",
                    "description": "SMB ports are frequent targets for ransomware (e.g., WannaCry).",
                    "severity": "HIGH",
                    "impact": "Mitigates lateral movement and ransomware.",
                    "effort": "MEDIUM",
                    "command": "Block ports 139/445 on internet-facing interfaces."
                })

            # RDP
            if port_num == "3389" or "ms-wbt-server" in service:
                recommendations.append({
                    "id": "WIN-RDP",
                    "title": "Secure RDP",
                    "description": "RDP is a prime target for brute force. Use a VPN or Gateway.",
                    "severity": "HIGH",
                    "impact": "Prevents unauthorized remote desktop access.",
                    "effort": "HIGH",
                    "command": "Require NLA (Network Level Auth) and VPN."
                })

            # DATABASES
            if port_num == "3306" or "mysql" in service:
                 recommendations.append({
                    "id": "DB-MYSQL",
                    "title": "Bind MySQL to Localhost",
                    "description": "MySQL should not be exposed publicly unless strictly necessary.",
                    "severity": "HIGH",
                    "impact": "Prevents direct database attacks.",
                    "effort": "LOW",
                    "command": "bind-address = 127.0.0.1 in my.cnf"
                })

        return recommendations
