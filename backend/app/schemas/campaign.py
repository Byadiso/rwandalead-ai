from pydantic import BaseModel
from datetime import datetime


class CampaignCreate(BaseModel):

    name: str
    city: str
    niche: str


class CampaignResponse(BaseModel):

    id: int

    name: str
    city: str
    niche: str

    status: str

    created_at: datetime

    class Config:
        from_attributes = True