from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.lead import Lead
from app.models.campaign import Campaign

from app.core.dependencies import get_current_user

from app.models.user import User

router = APIRouter(
    prefix="/outreach",
    tags=["Outreach"]
)


@router.get("/{lead_id}")
def generate_outreach(
    lead_id: int,
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

    email = f"""
Subject: Helping {lead.business_name} attract more customers

Hello,

I came across {lead.business_name} while researching businesses in {lead.city}.

I noticed some opportunities that could help increase online visibility and attract more bookings.

Based on my review, I identified:

- {lead.service_gap}
- Improvement opportunities for local SEO
- Better lead generation opportunities

I'd love to show you a few quick recommendations.

Would you be open to a short conversation this week?

Best regards
"""

    whatsapp = f"""
Hello,

I came across {lead.business_name} and noticed some opportunities to improve online visibility and attract more customers.

Would you be open to a quick chat about some ideas?

Thank you.
"""

    proposal = f"""
Business: {lead.business_name}

Recommended Services:

- Website Development
- Google Business Optimization
- Local SEO
- Reputation Management

Priority Level: {lead.priority}

Opportunity Score: {lead.opportunity_score}
"""

    return {
        "email": email,
        "whatsapp": whatsapp,
        "proposal": proposal
    }