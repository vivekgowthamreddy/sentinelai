import re

URGENCY_WORDS = [
    "urgent", "immediately", "now", "last warning",
    "act fast", "limited time"
]

THREAT_WORDS = [
    "blocked", "suspended", "terminated",
    "account closed", "legal action"
]

AUTHORITY_WORDS = [
    "bank", "support", "admin", "security team",
    "official", "customer care"
]

ACTION_WORDS = [
    "click", "verify", "login", "update",
    "confirm", "submit"
]


def behavioral_signal(text: str):
    text = text.lower()

    urgency_score = sum(1 for w in URGENCY_WORDS if w in text)
    threat_score = sum(1 for w in THREAT_WORDS if w in text)
    authority_score = sum(1 for w in AUTHORITY_WORDS if w in text)
    action_score = sum(1 for w in ACTION_WORDS if w in text)

    total_hits = urgency_score + threat_score + authority_score + action_score

    # Normalize to max 30
    behavior_score = min(total_hits * 6, 30)

    detected_patterns = []

    if urgency_score > 0:
        detected_patterns.append("urgency_manipulation")
    if threat_score > 0:
        detected_patterns.append("fear_induction")
    if authority_score > 0:
        detected_patterns.append("authority_impersonation")
    if action_score > 0:
        detected_patterns.append("forced_action")

    return {
        "behavior_score": behavior_score,
        "patterns": detected_patterns
    }
