import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib

# ---------------------------
# 1. Tiny, realistic dataset
# ---------------------------
# [content_score, url_score, behavior_score]
X = np.array([
    [10, 5, 5],    # safe
    [15, 0, 10],   # safe
    [20, 10, 15],  # borderline
    [40, 20, 30],  # suspicious
    [60, 40, 50],  # malicious
    [80, 60, 70],  # highly malicious
    [90, 80, 90],  # scam
    [100, 90, 95]  # severe scam
])

# Labels: 0 = safe, 1 = malicious
y = np.array([
    0, 0, 0,
    1, 1, 1,
    1, 1
])

# ---------------------------
# 2. Train model
# ---------------------------
model = LogisticRegression()
model.fit(X, y)

# ---------------------------
# 3. Save model
# ---------------------------
joblib.dump(model, "backend/ml/scam_risk_model.pkl")

print("✅ ML model trained and saved successfully.")
