from models import ChatLogs, BoardHistory
from dbModels import User
from fastapi import FastAPI, Request, Body, HTTPException
import uvicorn
from database import get_db
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

import httpx
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend import models, db_schema
from passlib.context import CryptContext


app = FastAPI()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

