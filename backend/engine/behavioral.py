def behavioral_signal(text: str) -> dict:
    patterns = []
    score = 0
    lower = text.lower()

    if "click" in lower or "download" in lower or "track" in lower or "claim" in lower:
        patterns.append("forced_action")
        score += 20

    if "now" in lower or "immediately" in lower:
        patterns.append("urgency_manipulation")
        score += 15

    if "account" in lower and "verify" in lower:
        patterns.append("authority_impersonation")
        score += 15

    if "warning" in lower or "alert" in lower:
        patterns.append("fear_induction")
        score += 10

    return {
        "behavior_score": min(score, 40),
        "patterns": patterns
    }
