from datetime import datetime

def build_timeline(event_type: str, details: dict):
    return {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "eventType": event_type,
        "details": details
    }
