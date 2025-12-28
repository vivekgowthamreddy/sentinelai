import pickle
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
        try:
            import joblib  # type: ignore

            _model = joblib.load(MODEL_PATH)
        except ModuleNotFoundError:
            with MODEL_PATH.open("rb") as f:
                _model = pickle.load(f)
        except Exception as e:
            raise RuntimeError(f"Failed to load ML model from {MODEL_PATH}: {e}") from e
    return _model


def ml_predict(features: list) -> float:
    try:
        model = load_model()
        X = np.array(features).reshape(1, -1)
        prob = model.predict_proba(X)[0][1]  # malicious probability
        return round(float(prob), 2)
    except Exception:
        # Heuristic fallback: normalize feature sum to a 0..1-ish probability.
        total = float(sum(float(x) for x in features))
        prob = max(0.0, min(1.0, total / 300.0))
        return round(prob, 2)

