def decide_action(score: int) -> str:
    if score >= 70:
        return "IMMEDIATE_BLOCK"
    if score >= 40:
        return "WARN_USER"
    return "ALLOW"
