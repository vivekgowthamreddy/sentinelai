import re

URGENCY_WORDS = ["urgent", "immediately", "act now", "suspended", "verify", "claim", "returned", "expire"]
FEAR_WORDS = ["blocked", "closed", "warning", "alert", "failed", "unauthorized"]
AUTHORITY_WORDS = ["bank", "government", "admin", "support", "fedex", "usps", "dhl", "ups", "amazon", "delivery", "package"]

SHORT_URL_PATTERNS = ["bit.ly", "tinyurl", "goo.gl"]


def content_signal(text: str) -> int:
    score = 0
    lower = text.lower()

    for w in URGENCY_WORDS:
        if w in lower:
            score += 15

    for w in FEAR_WORDS:
        if w in lower:
            score += 10

    for w in AUTHORITY_WORDS:
        if w in lower:
            score += 10

    return min(score, 50)


def url_signal(url: str) -> int:
    if not url:
        return 0

    score = 0
    for short in SHORT_URL_PATTERNS:
        if short in url:
            score += 25

    if not re.match(r"https://", url):
        score += 10

    return min(score, 40)
