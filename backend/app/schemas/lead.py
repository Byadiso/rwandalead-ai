from pydantic import BaseModel


class LeadCreate(BaseModel):

    campaign_id: int

    business_name: str
    city: str

    phone: str
    website: str

    rating: str

    review_count: int

    opportunity_score: int

    priority: str

    service_gap: str


class LeadResponse(BaseModel):

    id: int

    campaign_id: int

    business_name: str
    city: str

    phone: str
    website: str

    rating: str

    review_count: int

    opportunity_score: int

    priority: str

    service_gap: str

    pipeline_stage: str

    class Config:
        from_attributes = True