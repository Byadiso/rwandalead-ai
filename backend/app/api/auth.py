from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import traceback

from app.db.database import SessionLocal
from app.models.user import User

from app.schemas.auth import UserCreate, UserLogin, Token

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# @router.post("/register")
# def register(user: UserCreate, db: Session = Depends(get_db)):

#     existing = db.query(User).filter(User.email == user.email).first()

#     if existing:
#         raise HTTPException(status_code=400, detail="User already exists")

#     new_user = User(
#         email=user.email,
#         full_name=user.full_name,
#         hashed_password=hash_password(user.password),
#         plan="starter",
#         credits=100
#     )

#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return {"message": "User created successfully"}


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        existing = db.query(User).filter(User.email == user.email).first()

        if existing:
            raise HTTPException(status_code=400, detail="User already exists")

        new_user = User(
            email=user.email,
            full_name=user.full_name,
            hashed_password=hash_password(user.password),
            plan="starter",
            credits=100
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"message": "User created successfully"}
        
    except Exception as e:
        # This prints the actual underlying error to your server logs
        print("--- BACKEND CRASH LOG ---")
        traceback.print_exc()
        print("-------------------------")
        # This sends the error cleanly back to your browser network tab
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    
    
@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }