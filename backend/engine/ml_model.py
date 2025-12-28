import joblib
import numpy as np
from pathlib import Path

# Resolve path: backend/ml/scam_risk_model.pkl
MODEL_PATH = Path(__file__).resolve().parents[1] / "ml" / "scam_risk_model.pkl"

_model = None

def load_model():
    global _model
    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"ML model not found at {MODEL_PATH}")
        _model = joblib.load(MODEL_PATH)
    return _model


def ml_predict(features: list) -> float:
    model = load_model()
    X = np.array(features).reshape(1, -1)
    prob = model.predict_proba(X)[0][1]  # malicious probability
    return round(float(prob), 2)

