def decide_action(score: int):
    if score >= 80:
        return "IMMEDIATE_BLOCK"
    if score >= 50:
        return "WARN_USER"
    return "ALLOW"
