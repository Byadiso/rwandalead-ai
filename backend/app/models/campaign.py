from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from app.db.base import Base

class Campaign(Base):

    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String)

    city = Column(String)

    niche = Column(String)

    status = Column(String, default="pending")