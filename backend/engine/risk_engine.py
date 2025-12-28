from engine.signals import content_signal, url_signal
from engine.behavioral import behavioral_signal
from engine.decision import decide_action
from engine.ml_model import ml_predict
from engine.incident_response import generate_incident_response
from engine.network_risk import network_risk_score
from engine.timeline import build_timeline
from engine.child_safety import child_content_score, escalate_for_child


def analyze_risk(
    text: str,
    url: str,
    network_risk: str = "LOW",
    child_mode: bool = False
):

    # ---------- Feature Extraction ----------
    content_score = content_signal(text)
    url_score = url_signal(url)
    behavior = behavioral_signal(text)

    # ---------- Rule-based Score ----------
    rule_score = min(
        content_score + url_score + behavior["behavior_score"], 100
    )

    # ---------- ML Prediction ----------
    ml_probability = ml_predict([
        content_score,
        url_score,
        behavior["behavior_score"]
    ])

    # ---------- Hybrid AI Fusion ----------
    final_score = int(
        (rule_score * 0.6) + (ml_probability * 100 * 0.4)
    )

    # ---------- Network Risk Fusion ----------
    final_score = min(
        final_score + network_risk_score(network_risk), 100
    )

    # ---------- Base Risk Level ----------
    risk_level = (
        "HIGH" if final_score >= 70
        else "MEDIUM" if final_score >= 40
        else "LOW"
    )

    # ---------- Child Safety Escalation ----------
    if child_mode:
        final_score = min(
            final_score + child_content_score(text), 100
        )
        risk_level = escalate_for_child(risk_level)

    # ---------- Incident Response ----------
    incident_response = generate_incident_response(
        risk_level=risk_level,
        threat_vectors=behavior["patterns"]
    )

    # ---------- Timeline ----------
    timeline = [
        build_timeline(
            "SCAM_ANALYSIS",
            {
                "riskScore": final_score,
                "mlRiskProbability": ml_probability,
                "threatVectors": behavior["patterns"],
                "childMode": child_mode
            }
        )
    ]

    if network_risk != "LOW":
        timeline.append(
            build_timeline(
                "NETWORK_SCAN",
                {"networkRiskLevel": network_risk}
            )
        )

    # ---------- Final Response ----------
    return {
        "globalRiskScore": final_score,
        "riskLevel": risk_level,
        "confidence": ml_probability,
        "mlRiskProbability": ml_probability,
        "networkRiskLevel": network_risk,
        "isChildMode": child_mode,
        "threatVectors": behavior["patterns"],
        "recommendedAction": decide_action(final_score),
        "incidentResponse": incident_response,
        "incidentTimeline": timeline
    }
