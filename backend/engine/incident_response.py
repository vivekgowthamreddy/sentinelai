def generate_incident_response(risk_level: str, threat_vectors: list):
    if risk_level == "HIGH":
        return {
            "severity": "CRITICAL",
            "nextSteps": [
                "Do NOT click any links",
                "Block the sender immediately",
                "Change related account passwords",
                "Enable two-factor authentication",
                "Contact official support or bank helpline",
                "Report the incident to cybercrime authorities"
            ]
        }

    if risk_level == "MEDIUM":
        return {
            "severity": "WARNING",
            "nextSteps": [
                "Avoid clicking suspicious links",
                "Verify sender identity",
                "Monitor your account activity",
                "Mark message as spam"
            ]
        }

    return {
        "severity": "LOW",
        "nextSteps": [
            "No action required",
            "Stay alert for similar messages"
        ]
    }
