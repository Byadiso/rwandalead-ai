from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine
from app.db.base import Base

from app.models.user import User
from app.models.campaign import Campaign
from app.models.lead import Lead

from app.api.outreach import router as outreach_router


from app.api.campaigns import router as campaign_router
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.leads import router as leads_router
from app.api.analysis import router as analysis_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
         "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(campaign_router)
app.include_router(users_router)
app.include_router(leads_router)

app.include_router(analysis_router)
app.include_router(outreach_router)


@app.get("/")
def home():
    return {"message": "RwandaLead API Running"}