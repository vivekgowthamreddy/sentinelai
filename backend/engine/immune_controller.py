from engine.risk_engine import analyze_risk

def immune_controller(payload: dict):
    """
    Central AI Immune Layer
    """

    # 1️⃣ OBSERVE
    text = payload.get("text", "")
    url = payload.get("url", "")
    network_risk = payload.get("network_risk", "LOW")
    child_mode = payload.get("child_mode", False)

    # 2️⃣ DETECT + DECIDE (Reuse your AI)
    result = analyze_risk(
        text=text,
        url=url,
        network_risk=network_risk,
        child_mode=child_mode
    )

    # 3️⃣ NEUTRALIZE (Policy-based)
    immune_action = neutralize(result)

    # 4️⃣ REMEMBER (Append immune decision)
    result["immuneAction"] = immune_action

    # 5️⃣ PREVENT (Policy hints)
    result["preventionPolicy"] = prevention_policy(result)

    return result


def neutralize(result: dict):
    risk = result["riskLevel"]

    if risk in ["HIGH", "CRITICAL"]:
        return {
            "mode": "ACTIVE_DEFENSE",
            "actions": [
                "BLOCK_SUSPICIOUS_ACTION",
                "SHOW_FULL_SCREEN_WARNING",
                "REQUIRE_USER_CONFIRMATION"
            ]
        }

    if risk == "MEDIUM":
        return {
            "mode": "CAUTION",
            "actions": [
                "SHOW_WARNING",
                "LOG_BEHAVIOR"
            ]
        }

    return {
        "mode": "PASSIVE",
        "actions": ["MONITOR"]
    }


def prevention_policy(result: dict):
    history_weight = len(result.get("incidentTimeline", []))

    if history_weight >= 2:
        return {
            "policy": "HARDENED",
            "notes": "Future similar threats will be auto-blocked"
        }

    return {
        "policy": "STANDARD",
        "notes": "Monitoring for similar behavior"
    }
    