from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.campaign import Campaign

from app.schemas.campaign import (
    CampaignCreate,
    CampaignResponse
)

router = APIRouter(
    prefix="/campaigns",
    tags=["Campaigns"]
)


@router.post(
    "",
    response_model=CampaignResponse
)
def create_campaign(
    campaign: CampaignCreate,
    db: Session = Depends(get_db)
):

    new_campaign = Campaign(
        name=campaign.name,
        city=campaign.city,
        niche=campaign.niche,
        status="pending"
    )

    db.add(new_campaign)

    db.commit()

    db.refresh(new_campaign)

    return new_campaign


@router.get("")
def get_campaigns(
    db: Session = Depends(get_db)
):

    return db.query(Campaign).all()