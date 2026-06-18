from app.services.playwright_scraper import (
    scrape_google_maps
)


def discover_leads(
    city: str,
    niche: str
):

    raw_leads = scrape_google_maps(
        city,
        niche
    )

    processed = []

    for lead in raw_leads:

        score = 0

        gaps = []

        if not lead["website"]:

            gaps.append(
                "Needs Website"
            )

            score += 50

        if lead["rating"]:

            if lead["rating"] < 4.2:

                gaps.append(
                    "Reputation Fix"
                )

                score += 30

        else:

            gaps.append(
                "New/Unrated"
            )

            score += 20

        if lead["review_count"] < 10:

            gaps.append(
                "Low Reviews"
            )

            score += 20    

        priority = "Low"

        if score >= 70:
            priority = "High"

        elif score >= 30:
            priority = "Medium"

        processed.append({

            "business_name":
                lead["business_name"],

            "city":
                lead["city"],

            "website":
                lead["website"],

            "phone":
                lead["phone"],

            "rating":
                lead["rating"],

            "service_gap":
                ", ".join(gaps),

            "priority":
                priority,

            "opportunity_score":
                score

        })

    return processed