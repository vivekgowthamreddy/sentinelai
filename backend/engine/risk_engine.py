from engine.signals import content_signal, url_signal
from engine.behavioral import behavioral_signal
from engine.ml_model import ml_predict
from engine.network_risk import network_risk_score
from engine.child_safety import child_content_score, escalate_for_child
from engine.decision import decide_action
from engine.incident_response import generate_incident_response
from engine.timeline import build_timeline


def analyze_risk(text: str, url: str = "", network_risk="LOW", child_mode=False):
    content_score = content_signal(text)
    url_score = url_signal(url)
    behavior = behavioral_signal(text)

    rule_score = content_score + url_score + behavior["behavior_score"]
    rule_score = min(rule_score, 100)

    ml_probability = ml_predict([content_score, url_score, behavior["behavior_score"]])
    final_score = int((rule_score * 0.6) + (ml_probability * 100 * 0.4))

    final_score += network_risk_score(network_risk)
    final_score = min(final_score, 100)

    risk_level = (
        "HIGH" if final_score >= 70
        else "MEDIUM" if final_score >= 40
        else "LOW"
    )

    if child_mode:
        final_score += child_content_score(text)
        risk_level = escalate_for_child(risk_level)

    incident_response = generate_incident_response(risk_level, behavior["patterns"])

    timeline = [
        build_timeline("SCAM_ANALYSIS", {
            "riskScore": final_score,
            "threatVectors": behavior["patterns"],
            "mlRiskProbability": ml_probability
        })
    ]

    return {
        "globalRiskScore": final_score,
        "riskLevel": risk_level,
        "confidence": ml_probability,
        "recommendedAction": decide_action(final_score),
        "incidentResponse": incident_response,
        "incidentTimeline": timeline
    }
