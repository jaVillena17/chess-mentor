from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Entidad user
class User(BaseModel):
    name: str
    surname: str
    url: str
    age: int

user = {"usuario1" : User(name="Javier", surname="Villena", url="www.nipo.com", age=27)}

@app.get('/')
async def root():
    return "Hola FastAPI"

@app.get('/curso')
async def get_curso():
    return {"key" : "value"}

@app.get('/user')
async def get_user():
    return user

# uvicorn main:app --reload

# /docs - /redocs