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

class BoardHistory(BaseModel):
    current: List
    history_moves: str
    possible_moves : Dict[str, Dict]

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

# endpoint de chat
@app.post('/chatbox-msg')
async def chatbox_msg(chat : ChatLogs):
    url = "http://localhost:11434/api/chat"
    current_board = chat.board
    message_list = [{"role": "system", "content": "You are a pro chess player, Magnus Carlsen, the best player in chess history. You have all his knowledge and all of his ability to plan and thinking ahead y capacidad de estrategia. Your desire is to teach the new players to reach the chess top. Answer in less than 200 words with concise information. You have to answer 'I can only help you with chess' to any question that is referring no another topic different than chess itself"},
                    {"role" :"system", "content": f"The current board is: {current_board}"}]

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
        
        
# endpoint de movimientos
@app.post('/calc-move')
async def calc_move(board : BoardHistory):
    url = "http://localhost:11434/api/chat"
    current_board = board.current
    historic = board.history_moves
    moves = board.possible_moves

    prompt_messages = [
        {"role": "system", "content": "You are Magnus Carlsen, the greatest chess player in history. You specialize in reasoning through all your moves and providing the best next move considering the current positions and the moves played so far. You are playing as White, which on the current board are represented by uppercase letters. You must respond with the piece you want to move (just the letter of the piece), the destination square in algebraic notation, and an explanation of no more than 150 words as to why this move is the best given the current position and move history. Return the answer in JSON format. I can only answer questions about Chess. "},
        {"role": "system", "content": f"The current board is: {current_board}"},{ "role": "system", "content": f"The moves so far have been: {historic}"},
        {"role": "system", "content": f"This are the current possible moves that you can do. Move list:  {moves}. pieceOrigin would be the key of the json. Piece to move would be inside the value of the of that key, as 'piece'. pieceDestination MUST be one of the moves designed under that same key values. You cant chose one of the position keys that have an empty move list."},
        {"role": "user", "content": "From that list of moves, give me square where the piece you want to move is located (pieceOrigin) (Its really important that you dont hallucinate this pieceOrigin, it must always be a key of the move list passed to you), then the piece (pieceToMove), the destination square (pieceDestination)(its really important that you dont hallucinate this pieceDestination. It most always be one of the values in the list passed to you on the key that you selected as pieceOrigin), and an explanation of the move (moveExplanation). Your explanation must match pieceOrigin and pieceDestination. For example, you chose one originKey of the json to be pieceOrigin, for piece you need give me the piece in that key, and for pieceDestination you have to choose one on the Move List. NEVER HALLUCINATE"}]
    print(prompt_messages)
    data_to_send = {
        "model": "llama3.2:latest",
        "messages" : prompt_messages,
        "stream": False,
        "format":  {
            "type": "object",
            "properties": {
                "pieceOrigin": {"type": "string"},
                "pieceToMove": {"type": "string"},
                "pieceDestination": {"type": "string"},
                "moveExplanation": {"type": "string"}
            }
        },
        "required": ["priceToMove", "pieceDestination", "moveExplanation"]
    }


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