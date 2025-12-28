from pydantic import BaseModel, ConfigDict, Field, AliasChoices, field_validator

class AnalyzeRequest(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    text: str
    url: str = Field(default="", validation_alias=AliasChoices("url"))
    network_risk: str = Field(
        default="LOW",
        validation_alias=AliasChoices("network_risk", "networkRisk"),
    )
    child_mode: bool = Field(
        default=False,
        validation_alias=AliasChoices("child_mode", "childMode"),
    )

    @field_validator("network_risk", mode="before")
    @classmethod
    def _normalize_network_risk(cls, v):
        if v is None:
            return "LOW"
        if isinstance(v, bool):
            return "MEDIUM" if v else "LOW"
        if isinstance(v, str):
            value = v.strip().upper()
            if value in {"LOW", "MEDIUM", "HIGH", "CRITICAL"}:
                return value
            return "LOW"
        return "LOW"

    @field_validator("child_mode", mode="before")
    @classmethod
    def _normalize_child_mode(cls, v):
        if v is None:
            return False
        return bool(v)
