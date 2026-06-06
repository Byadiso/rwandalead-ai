from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.lead import Lead
from app.models.campaign import Campaign

from app.schemas.lead import (
    LeadCreate,
    LeadResponse
)

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)

@router.post(
    "",
    response_model=LeadResponse
)
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    campaign = (
        db.query(Campaign)
        .filter(
            Campaign.id == lead.campaign_id,
            Campaign.user_id == current_user.id
        )
        .first()
    )

    if not campaign:
        return {
            "error": "Campaign not found"
        }

    new_lead = Lead(
        campaign_id=lead.campaign_id,
        business_name=lead.business_name,
        city=lead.city,
        phone=lead.phone,
        website=lead.website,
        rating=lead.rating,
        opportunity_score=lead.opportunity_score,
        priority=lead.priority,
        service_gap=lead.service_gap
    )

    db.add(new_lead)

    db.commit()

    db.refresh(new_lead)

    return new_lead


@router.get("")
def get_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    leads = (
        db.query(Lead)
        .join(
            Campaign,
            Campaign.id == Lead.campaign_id
        )
        .filter(
            Campaign.user_id ==
            current_user.id
        )
        .all()
    )

    return leads


@router.put("/{lead_id}/stage")
def update_stage(
    lead_id: int,
    stage: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    lead = (
        db.query(Lead)
        .join(
            Campaign,
            Campaign.id == Lead.campaign_id
        )
        .filter(
            Lead.id == lead_id,
            Campaign.user_id == current_user.id
        )
        .first()
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    lead.pipeline_stage = stage

    db.commit()

    return {
        "message": "Lead updated"
    }