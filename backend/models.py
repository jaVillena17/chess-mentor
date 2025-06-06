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
    history_moves: Dict[str, Dict[str, str]]
    possible_moves : Dict[str, Dict]

class Partida(BaseModel):
    moves: Dict[str, Dict[str, str]]
    winner: str

class EndGameData(BaseModel):
    partida : Partida






