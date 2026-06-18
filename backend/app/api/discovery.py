from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.user import User
from app.models.campaign import Campaign
from app.models.lead import Lead

from app.core.dependencies import get_current_user

from app.services.google_maps_scraper import discover_leads

router = APIRouter(
    prefix="/discovery",
    tags=["Discovery"]
)


@router.post("/{campaign_id}/run")
def run_discovery(
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

    discovered = discover_leads(
        campaign_id=campaign.id,
        city=campaign.city,
        niche=campaign.niche
    )

    for item in discovered:

        lead = Lead(
            campaign_id=campaign.id,
            business_name=item["business_name"],
            city=item["city"],
            website=item["website"],
            phone=item["phone"],
            rating=item["rating"],
            review_count=item["review_count"],
            service_gap=item["service_gap"],
            priority=item["priority"],
            opportunity_score=item["opportunity_score"]
        )

        db.add(lead)

    campaign.status = "completed"

    db.commit()

    return {
        "message": "Discovery completed",
        "leads_found": len(discovered)
    }