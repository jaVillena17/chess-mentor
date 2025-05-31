from pydantic import BaseModel, Json
from typing import Dict, List

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

class Partida(BaseModel):
    moves: str
    date: str
    winner: str
    username : str

class EndGameData(BaseModel):
    partida : Partida






