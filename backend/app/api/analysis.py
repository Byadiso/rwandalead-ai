from fastapi import APIRouter

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


@router.get("/{lead_id}")
def analyze_lead(
    lead_id: int
):

    return {

        "opportunity_score": 90,

        "problems": [
            "No Website",
            "Weak SEO Presence",
            "Low Reviews"
        ],

        "services": [
            "Website Development",
            "Local SEO",
            "Google Business Optimization"
        ],

        "estimated_value": "$800 - $2,000"

    }