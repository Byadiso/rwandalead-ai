from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.campaign import Campaign

from app.schemas.campaign import (
    CampaignCreate,
    CampaignResponse
)

from app.services.discovery import run_discovery

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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_campaign = Campaign(
        user_id=current_user.id,
        name=campaign.name,
        city=campaign.city,
        niche=campaign.niche,
        status="pending"
    )

    db.add(new_campaign)

    db.commit()

    db.refresh(new_campaign)

    return new_campaign


@router.get(
    "",
    response_model=list[CampaignResponse]
)
def get_campaigns(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    campaigns = (
        db.query(Campaign)
        .filter(
            Campaign.user_id == current_user.id
        )
        .all()
    )

    return campaigns


@router.post("/{campaign_id}/run")
def run_campaign(
    campaign_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    campaign = (
        db.query(Campaign)
        .filter(
            Campaign.id == campaign_id,
            Campaign.user_id == current_user.id
        )
        .first()
    )

    if not campaign:
        raise HTTPException(
            status_code=404,
            detail="Campaign not found"
        )

    campaign.status = "running"

    db.commit()

    try:

        run_discovery(
            db=db,
            campaign=campaign
        )

        campaign.status = "completed"

        db.commit()

        return {
            "message": "Discovery completed"
        }

    except Exception as e:

        campaign.status = "failed"

        db.commit()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )