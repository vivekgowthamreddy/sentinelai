def network_risk_score(level: str) -> int:
    mapping = {
        "LOW": 0,
        "MEDIUM": 10,
        "HIGH": 20
    }
    return mapping.get(level.upper(), 0)
