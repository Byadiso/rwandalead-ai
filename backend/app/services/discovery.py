from app.models.lead import Lead


def run_discovery(
    db,
    campaign
):

    sample_leads = [

        {
            "business_name": "Volcano Safari Ltd",
            "city": campaign.city,
            "phone": "+250788111111",
            "website": "",
            "rating": "3.8",
            "opportunity_score": 90,
            "priority": "High",
            "service_gap": "Needs Website"
        },

        {
            "business_name": "Kivu Adventure Tours",
            "city": campaign.city,
            "phone": "+250788222222",
            "website": "",
            "rating": "4.1",
            "opportunity_score": 75,
            "priority": "Medium",
            "service_gap": "Needs Website"
        }

    ]

    for item in sample_leads:

        lead = Lead(
            campaign_id=campaign.id,
            business_name=item["business_name"],
            city=item["city"],
            phone=item["phone"],
            website=item["website"],
            rating=item["rating"],
            opportunity_score=item["opportunity_score"],
            priority=item["priority"],
            service_gap=item["service_gap"]
        )

        db.add(lead)

    db.commit()