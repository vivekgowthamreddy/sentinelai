import math
import re

COMMON_PATTERNS = [
    r"12345", r"password", r"qwerty", r"admin", r"letmein"
]

def entropy(password: str) -> float:
    if not password:
        return 0.0
    pool = 0
    if re.search(r"[a-z]", password): pool += 26
    if re.search(r"[A-Z]", password): pool += 26
    if re.search(r"[0-9]", password): pool += 10
    if re.search(r"[^a-zA-Z0-9]", password): pool += 32
    return round(len(password) * math.log2(max(pool, 1)), 2)

def pattern_penalty(password: str) -> int:
    p = password.lower()
    for pat in COMMON_PATTERNS:
        if re.search(pat, p):
            return 30
    if re.search(r"(.)\1{2,}", p):  # aaa, 111
        return 20
    if re.search(r"(abc|abcd|abcd|xyz)", p):
        return 15
    return 0

def analyze_password(password: str):
    ent = entropy(password)
    penalty = pattern_penalty(password)

    score = min(max(int(ent - penalty), 0), 100)

    if score >= 75:
        level = "STRONG"
        advice = ["Good job! Use unique passwords per site."]
    elif score >= 45:
        level = "MEDIUM"
        advice = [
            "Increase length (16+ recommended)",
            "Add symbols and mixed case",
            "Avoid predictable patterns"
        ]
    else:
        level = "WEAK"
        advice = [
            "Increase length significantly",
            "Add symbols, numbers, and mixed case",
            "Avoid common words and repeats",
            "Consider a password manager"
        ]

    return {
        "passwordScore": score,
        "strength": level,
        "entropy": ent,
        "recommendations": advice,
        "note": "Password is analyzed locally and never stored."
    }
