import re

CHILD_RISK_TERMS = [
    "secret", "don’t tell", "meet alone", "send photo", "address",
    "gift", "free game", "robux", "vbucks", "skins", "battle pass",
    "dm me", "whatsapp me", "discord", "snapchat", "telegram",
    "click this", "verification", "otp", "parents home"
]

def child_content_score(text: str) -> int:
    t = text.lower()
    hits = sum(1 for w in CHILD_RISK_TERMS if w in t)
    return min(hits * 10, 40)

def escalate_for_child(risk_level: str) -> str:
    if risk_level == "LOW":
        return "MEDIUM"
    if risk_level == "MEDIUM":
        return "HIGH"
    return "CRITICAL"
