from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    text: str
    url: str = ""
    network_risk: str = "LOW"
    child_mode: bool = False
