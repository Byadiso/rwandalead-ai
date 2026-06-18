from app.core.celery_app import celery

from app.db.database import SessionLocal

from app.models.campaign import Campaign
from app.models.lead import Lead

from app.services.google_maps_scraper import discover_leads


@celery.task
def run_discovery_task(campaign_id):

    db = SessionLocal()

    try:

        campaign = (
            db.query(Campaign)
            .filter(
                Campaign.id == campaign_id
            )
            .first()
        )

        if not campaign:
            return

        campaign.status = "running"

        db.commit()

        leads = discover_leads(
            city=campaign.city,
            niche=campaign.niche
        )

        for item in leads:

            lead = Lead(
                campaign_id=campaign.id,
                business_name=item["business_name"],
                city=item["city"],
                website=item["website"],
                phone=item["phone"],
                rating=item["rating"],
                service_gap=item["service_gap"],
                priority=item["priority"],
                opportunity_score=item["opportunity_score"]
            )

            db.add(lead)

        campaign.status = "completed"

        db.commit()

    except Exception as e:

        campaign.status = "failed"

        db.commit()

        raise e

    finally:

        db.close()