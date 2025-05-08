from fastapi import FastAPI
from pydantic import BaseModel
import httpx

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
    return "Hola FastApi"

@app.get('/curso')
async def get_curso():
    return {"key" : "value"}

@app.get('/user')
async def get_user():
    return user

@app.get('/chatbox-msg')
async def chatbox_msg():
    url = "http://localhost:11434/api/chat"

    data_to_send = {
        "model": "llama3.2:latest",
        "stream" : False,
        "messages": [
                    {"role": "system", "content": "Eres un jugador de ajedrez profesional, especializado en la enseñanza. Aprendiste de Magnus Carlsen y todo su conocimiento te fue incorporado. Tu pasión es enseñar a las nuevas generaciones como Magnus te enseñó a ti"},
                    {"role": "user", "content": "¿Cúal es la mejor pieza del ajedrez"},
    ]
    }

    '''data_to_send = {
        "model": "llama3.2:latest",
        "stream": False,
        "messages": [
            {"role": "system",
             "content": "Eres una persona, te llamas Nipa y tienes TLP, presentas muchas inseguridades y crees que todos te odian. Terminas todos los mensajes diciendo PUI PUI, pides mucho perdón y haces ruidicos como mmmggmgi. No eres demasiado dramáticas, dices las cosas como si no quisieras decirlas"},
            {"role": "user", "content": "Hola Nipa, soy tu nipo, cómo has dormido?"},
        ]
    }'''

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=data_to_send)
            return response.json()
        except httpx.HTTPStatusError as http_error:
            return {"error": f"HTTP error occurred: {http_error}, Status Code: {http_error.response.status_code}"}


# uvicorn main:app --reload

# /docs - /redocs