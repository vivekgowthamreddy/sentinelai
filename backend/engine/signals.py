def content_signal(text: str):
    keywords = ["urgent", "otp", "account", "verify", "blocked", "click"]
    score = sum(1 for k in keywords if k in text.lower())
    return min(score * 12, 40)

def url_signal(url: str):
    if not url:
        return 0
    suspicious = ["bit.ly", "tinyurl", ".ru", ".xyz"]
    return 30 if any(s in url for s in suspicious) else 10

def behavior_signal():
    return 15  # placeholder for advanced pattern logic
