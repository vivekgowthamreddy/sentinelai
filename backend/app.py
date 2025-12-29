from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from engine.immune_controller import immune_controller
import os
from pathlib import Path

# -------------------------
# CREATE APP FIRST
# -------------------------
app = FastAPI(title="SentinelAI Risk Engine")

# -------------------------
# CORS CONFIGURATION
# -------------------------
app.add_middleware(
    CORSMiddleware,
    # Allow all localhost ports (http://localhost:ANY_PORT and http://127.0.0.1:ANY_PORT)
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# IMPORT ENGINES
# -------------------------
from engine.risk_engine import analyze_risk
from engine.password_strength import analyze_password
from engine.nmap_scanner import run_nmap_scan
from models.schemas import AnalyzeRequest

# -------------------------
# REQUEST MODELS
# -------------------------
class PasswordRequest(BaseModel):
    password: str

class NmapRequest(BaseModel):
    target: str

class CodeAnalyzeRequest(BaseModel):
    code: str
    language: str | None = None

# -------------------------
# ROUTES
# -------------------------
@app.post("/immune-check")
def immune_check(data: AnalyzeRequest):
    return immune_controller(data.model_dump())

@app.post("/api/immune-check")
def immune_check_api(data: AnalyzeRequest):
    return immune_controller(data.model_dump())

@app.post("/analyze")
def analyze(data: AnalyzeRequest):
    return analyze_risk(
        data.text,
        data.url,
        data.network_risk,
        data.child_mode
    )

@app.post("/api/analyze")
def analyze_api(data: AnalyzeRequest):
    return analyze_risk(
        data.text,
        data.url,
        data.network_risk,
        data.child_mode
    )

@app.post("/password-check")
def password_check(data: PasswordRequest):
    return analyze_password(data.password)

@app.post("/api/password-check")
def password_check_api(data: PasswordRequest):
    return analyze_password(data.password)

@app.post("/network-scan")
def network_scan(data: NmapRequest):
    scan_result = run_nmap_scan(data.target)
    scan_result["note"] = "This scan is for educational and defensive purposes only."
    return scan_result

@app.post("/api/network-scan")
def network_scan_api(data: NmapRequest):
    scan_result = run_nmap_scan(data.target)
    scan_result["note"] = "This scan is for educational and defensive purposes only."
    return scan_result

def _analyze_code_snippet(code: str):
    issues = []
    patterns = [
        ("HardcodedSecret", ["api_key", "apikey", "secret", "password", "token"], "Possible hardcoded secret."),
        ("EvalUsage", ["eval(", "exec(", "compile("], "Use of dynamic code execution (possible RCE)."),
        ("CommandInjection", ["os.system", "subprocess.call", "subprocess.Popen", "shell=True", "spawn", "syscall"], "Potential command execution path."),
        ("InsecureDeserialization", ["pickle.loads", "yaml.load", "unpickle"], "Potential unsafe deserialization."),
        ("SQLInjection", ["execute(", "cursor.execute("], "Potential SQL Injection."),
        ("ReverseShell", ["socket.socket", "ptty.spawn", "os.dup2", "/bin/sh", "/bin/bash", "nc -e"], "Potential Reverse Shell / Backdoor indicator."),
        ("FileDestruction", ["os.remove", "os.unlink", "rmtree", "shutil.rmtree"], "Destructive file operation detected."),
        ("NetworkSocket", ["bind(", "listen(", "connect("], "Direct network socket usage (verify authorization)."),
        ("Obfuscation", ["base64.b64decode", "rot13", "zlib.decompress"], "Potential obfuscated payload decoding."),
    ]
    
    lines = code.split('\n')
    for i, line in enumerate(lines):
        lower_line = line.lower()
        for issue_type, needles, message in patterns:
            for n in needles:
                if n in lower_line:
                    # Avoid duplicates per line if multiple needles of same type match
                    issues.append({"type": issue_type, "message": message, "line": i + 1})
                    break

    risk = "LOW"
    # Logic: High if Injection/Eval/Deserialization/Shell found. Medium if just Secrets.
    high_risk_types = {
        "CommandInjection", "InsecureDeserialization", "EvalUsage", "SQLInjection", 
        "ReverseShell", "FileDestruction", "Obfuscation"
    }
    
    if any(i["type"] in high_risk_types for i in issues):
        risk = "HIGH"
    elif any(i["type"] == "NetworkSocket" for i in issues):
        risk = "MEDIUM"
    elif issues:
        risk = "MEDIUM"

    return {"riskLevel": risk, "issues": issues}

@app.post("/code-analyze")
def code_analyze(data: CodeAnalyzeRequest):
    return _analyze_code_snippet(data.code)

@app.post("/api/code-analyze")
def code_analyze_api(data: CodeAnalyzeRequest):
    return _analyze_code_snippet(data.code)

@app.get("/")
def root():
    return {"status": "SentinelAI backend running"}

# -------------------------
# LOCAL RUN
# -------------------------
if __name__ == "__main__":
    os.chdir(Path(__file__).resolve().parent)
    import uvicorn
    uvicorn.run(
        "app:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=True,
    )
