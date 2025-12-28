import numpy as np
from sklearn.linear_model import LogisticRegression

# Dummy training data (hackathon-safe)
# Features: [content_score, url_score, behavior_score]
X_train = np.array([
    [5, 10, 5],
    [10, 30, 25],
    [2, 0, 1],
    [8, 20, 15],
    [1, 0, 0],
    [12, 30, 30]
])

y_train = np.array([0, 1, 0, 1, 0, 1])  # 1 = scam, 0 = safe

model = LogisticRegression()
model.fit(X_train, y_train)


def ml_predict(features: list):
    prob = model.predict_proba([features])[0][1]
    return round(float(prob), 2)

