from engine.risk_engine import analyze_risk
from engine.defense_status import defense_state

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
    immune_action = neutralize(result, payload)

    # 4️⃣ REMEMBER (Append immune decision)
    result["immuneAction"] = immune_action

    # 5️⃣ PREVENT (Policy hints)
    result["preventionPolicy"] = prevention_policy(result)

    return result


def neutralize(result: dict, payload: dict):
    risk = result["riskLevel"]
    
    # Check if system is already in ACTIVE_DEFENSE mode
    current_status = defense_state.get_status()
    if current_status["mode"] == "ACTIVE_DEFENSE":
        return {
            "mode": "ACTIVE_DEFENSE",
            "actions": [
                "SYSTEM_LOCKDOWN_ACTIVE",
                "BLOCKING_UNAUTHORIZED_ACTIONS",
                "REQUIRE_ADMIN_RESET"
            ],
            "note": "System is in persistent defense mode due to previous threat."
        }

    if risk in ["HIGH", "CRITICAL"]:
        # TRIGGER PERSISTENT DEFENSE
        defense_state.trigger_defense(payload, trigger_reason=f"Risk Level: {risk}")
        
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
    