import json
from typing import Dict, List

from fastapi import FastAPI, Request, Body
import uvicorn
from pydantic import BaseModel, Json
import httpx
from fastapi.middleware.cors import CORSMiddleware
from pyexpat.errors import messages


class Message(BaseModel):
    from_: str
    text: str

class ChatLogs(BaseModel):
    messages: Dict[str, Message]
    board : List

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def root():
    return "Hola FastApi"

@app.post('/chatbox-msg')
async def chatbox_msg(chat : ChatLogs):
    url = "http://localhost:11434/api/chat"
    current_board = chat.board
    message_list = [{"role": "system", "content": "Eres un jugador de ajedrez profesional, Magnus Carlsen, el mejor jugador de ajedrez de la historia. Posees todo su conocimiento y capacidad de estrategia. Tu pasión es enseñar a las nuevas generaciones. Response en menos de 200 palabras, respuestas concisas y con imformación compacta. Cualquier pregunta que no sea sobre Ajedrez, responde 'Solo puedo responder preguntas sobre Ajedrez'"},
                    {"role" :"system", "content": f"El Tablero actual es: {current_board}"}]

    data_to_send = {
        "model": "llama3.2:latest",
        "stream": False,
        "messages" : message_list
    }

    for x, y in chat.messages.items():
        message_unit = {
            "role" : y.from_ ,
            "content" : y.text
        }
        message_list.append(message_unit)

    print(data_to_send)

    '''data_to_send = {
        "model": "llama3.2:latest",
        "stream" : False,
        "messages": [
                    {"role": "system", "content": "Eres un jugador de ajedrez profesional, especializado en la enseñanza. Aprendiste de Magnus Carlsen y todo su conocimiento te fue incorporado. Tu pasión es enseñar a las nuevas generaciones como Magnus te enseñó a ti"},
                    {"role": "user", "content": "hola"},
    ]
    }'''

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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


# uvicorn main:app --reload

# /docs - /redocs