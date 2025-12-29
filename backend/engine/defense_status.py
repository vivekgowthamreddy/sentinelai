from datetime import datetime
from typing import List, Dict, Any

class DefenseState:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DefenseState, cls).__new__(cls)
            cls._instance.status = "NORMAL" # NORMAL, ACTIVE_DEFENSE
            cls._instance.evolution_level = 0 # 0: Monitor, 1: Defend, 2: Active, 3: Lockdown
            cls._instance.incidents = []
            cls._instance.start_time = datetime.now()
        return cls._instance

    def trigger_defense(self, payload: Dict[str, Any], trigger_reason: str):
        if self.status != "ACTIVE_DEFENSE":
            self.status = "ACTIVE_DEFENSE"
            self.start_time = datetime.now()
        
        # Auto-evolve on high threats
        if "High" in trigger_reason or "CRITICAL" in trigger_reason or "Critical" in trigger_reason:
             self.evolve()

        incident_record = {
            "timestamp": datetime.now().isoformat(),
            "trigger": trigger_reason,
            "payload": payload,
            "action": "Defense Mode Activated"
        }
        self.incidents.append(incident_record)

    def evolve(self):
        if self.evolution_level < 3:
            self.evolution_level += 1
            self.status = "ACTIVE_DEFENSE" # Evolving always activates defense

    def check_url_access(self, url: str) -> Dict[str, Any]:
        """
        Returns {allowed: bool, reason: str, consequences: str}
        """
        url_lower = url.lower()
        
        # LEVEL 0: MONITOR (Log only)
        if self.evolution_level == 0:
            return {"allowed": True, "reason": "Monitoring Mode", "consequences": ""}
        
        # LEVEL 1 & 2: BLOCK KNOWN THREATS
        if self.evolution_level >= 1:
            if "malware" in url_lower:
                return {
                    "allowed": False, 
                    "reason": "Malware Distribution Site Detected", 
                    "consequences": "Visiting this site could install 'Ransomware', which encrypts your personal files and demands payment."
                }
            if "virus" in url_lower:
                return {
                    "allowed": False, 
                    "reason": "Viral Payload Detected", 
                    "consequences": "This site hosts self-replicating viruses that can spread to your contacts and slow down your system."
                }
            if "exploit" in url_lower:
                return {
                    "allowed": False, 
                    "reason": "Browser Exploit Kit", 
                    "consequences": "This site attempts to use security holes in your browser to take control of your webcam and microphone."
                }
            if "phishing" in url_lower or "bank" in url_lower and "fake" in url_lower:
                return {
                    "allowed": False, 
                    "reason": "Phishing / Fake Login", 
                    "consequences": "This site imitates a legitimate service to steal your passwords and credit card numbers."
                }

        # LEVEL 3: LOCKDOWN (Whitelist only)
        if self.evolution_level >= 3:
            allowed = ["localhost", "127.0.0.1", "sentinel", "google.com"]
            if any(a in url_lower for a in allowed):
                return {"allowed": True, "reason": "Whitelisted", "consequences": ""}
            
            return {
                "allowed": False, 
                "reason": "Lockdown Mode Enforcement", 
                "consequences": "System is in Total Lockdown. Only verified secure sites are accessible to prevent data exfiltration."
            }
            
        return {"allowed": True, "reason": "Safe", "consequences": ""}

    def get_status(self):
        return {
            "mode": self.status,
            "evolution_level": self.evolution_level,
            "incident_count": len(self.incidents),
            "last_incident": self.incidents[-1] if self.incidents else None
        }

    def reset(self):
        self.status = "NORMAL"
        self.evolution_level = 0
        self.incidents = []
        self.start_time = datetime.now()

    def get_report(self):
        return {
            "report_generated_at": datetime.now().isoformat(),
            "session_start": self.start_time.isoformat(),
            "status": self.status,
            "evolution_level": self.evolution_level,
            "total_incidents": len(self.incidents),
            "incidents": self.incidents
        }

defense_state = DefenseState()
