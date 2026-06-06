from pydantic import BaseModel

class CampaignCreate(BaseModel):

    name:str
    city:str
    niche:str


class CampaignResponse(BaseModel):

    id:int

    name:str
    city:str
    niche:str
    status:str

    class Config:
        from_attributes = True