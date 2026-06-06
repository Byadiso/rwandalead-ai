from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.db.base import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True)

    hashed_password = Column(String)

    full_name = Column(String)

    plan = Column(String, default="starter")

    credits = Column(Integer, default=100)