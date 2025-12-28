from fastapi import FastAPI
from pydantic import BaseModel
from engine.immune_controller import immune_controller
import os
from pathlib import Path

# -------------------------
# CREATE APP FIRST
# -------------------------
app = FastAPI(title="SentinelAI Risk Engine")

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

# -------------------------
# ROUTES
# -------------------------
@app.post("/immune-check")
def immune_check(data: AnalyzeRequest):
    return immune_controller(data.dict())

@app.post("/analyze")
def analyze(data: AnalyzeRequest):
    return analyze_risk(
        data.text,
        data.url,
        data.network_risk,
        data.child_mode
    )

@app.post("/password-check")
def password_check(data: PasswordRequest):
    return analyze_password(data.password)

@app.post("/network-scan")
def network_scan(data: NmapRequest):
    scan_result = run_nmap_scan(data.target)
    scan_result["note"] = "This scan is for educational and defensive purposes only."
    return scan_result

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
