from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from app.db.base import Base


class Lead(Base):

    __tablename__ = "leads"

    id = Column(
        Integer,
        primary_key=True
    )

    campaign_id = Column(
        Integer,
        ForeignKey("campaigns.id")
    )

    business_name = Column(String)

    city = Column(String)

    phone = Column(String)

    website = Column(String)

    rating = Column(String)

    opportunity_score = Column(Integer)

    priority = Column(String)

    service_gap = Column(String)

    pipeline_stage = Column(
        String,
        default="NEW"
    )