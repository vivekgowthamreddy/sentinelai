import os
import joblib
import numpy as np

MODEL_PATH = "ml/scam_risk_model.pkl"
_model = None


def load_model():
    global _model
    if _model is None:
        # Check current directory and up one level just in case
        if os.path.exists(MODEL_PATH):
            path = MODEL_PATH
        elif os.path.exists(f"backend/{MODEL_PATH}"):
            path = f"backend/{MODEL_PATH}"
        else:
            path = None
            
        if path:
            try:
                _model = joblib.load(path)
            except:
                _model = None
        else:
            _model = None
    return _model


def ml_predict(features: list) -> float:
    model = load_model()
    # Ensure features is just a list for sum, but numpy for predict
    features_array = np.array(features).reshape(1, -1)

    if model:
        try:
            return float(model.predict_proba(features_array)[0][1])
        except:
            pass

    # fallback heuristic (tuned for sensitivity: sum/120 allows ~0.8 probability for high-risk inputs)
    return min(float(np.sum(features)) / 120, 1.0)
