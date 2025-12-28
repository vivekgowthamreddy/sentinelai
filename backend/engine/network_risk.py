def network_risk_score(network_risk_level: str):
    if network_risk_level == "HIGH":
        return 30
    if network_risk_level == "MEDIUM":
        return 15
    return 0
