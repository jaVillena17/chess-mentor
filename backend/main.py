import json


from models import ChatLogs, BoardHistory, EndGameData, Partida
from dbModels import User, GameUser, Valoracion, Game
from fastapi import FastAPI, Request, Body, HTTPException
import uvicorn
from database import get_db
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
import httpx
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend import models, db_schema
from passlib.context import CryptContext
from datetime import datetime, timedelta

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 60 * 60 * 60
SECRET_KEY="d97ac5b0a6fd0f7c04a176a6ad59049318486a2a3f3a7d4db327d8f57451d9f2"

crypt = CryptContext(schemes=['bcrypt'], deprecated="auto")

app = FastAPI()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

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

def get_current_user(token: str = Depends(oauth2), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="No se pudo validar el token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception

    return user


@app.get('/')
async def root():
    return "Hola FastApi"

# endpoint de registro de usuario
@app.post('/new-user')
def create_user(user: db_schema.UserCreate, db : Session = Depends(get_db)):
    db_user = db.query(User).filter(
        (User.username == user.username) | (User.email == user.email)
    ).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe en la base de datos")
    new_user = User(
        username=user.username,
        email=user.email,
        contraseña=crypt.hash(user.contraseña)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"status" : 200, "reponse": f"Usuario creado con éxito: {new_user}"}

@app.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends(), db : Session = Depends(get_db)):
    user = form.username

    db_user = db.query(User).filter(
        (User.username == user)
    ).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="El usuario no existe en la base de datos")

    if not crypt.verify(form.password, db_user.contraseña):
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_DURATION)

    access_token = {"sub": db_user.username, "exp": int(expire.timestamp())}
    return {"access_token": jwt.encode(access_token, SECRET_KEY,algorithm=ALGORITHM), "token_type": "bearer", "username": db_user.username, "email": db_user.email}


@app.get('/users/me')
async def me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    id_user = user.id_usuario

    user_games = get_partidas_por_usuario_join(db, id_user)

    json_response = {}

    for game in user_games:
        game_json = {
            "game": {
                "movimientos" : game.movimientos,
                "ganador": game.ganador,
                "fecha": game.fecha
            }
        }

        # obtenemos la valoración se la partida

        game_valoration = (db.query(Valoracion).filter(Valoracion.id_partida == game.id_partida).first())
        if game_valoration:
            valoracion_json = {
                "rating": game_valoration.rating,
                "consejos": game_valoration.consejos
            }
            game_json["valoracion"] = valoracion_json
        else:
            valoracion_json = {
                "rating": "Tu partida aún se está valorando",
                "consejos": "Tu partida aún se está valorando"
            }
            game_json["valoracion"] = valoracion_json

        json_response[game.id_partida] = game_json

    return json_response

def get_partidas_por_usuario_join(db: Session, id_usuario: int):
    partidas = (
        db.query(Game)
        .join(GameUser, Game.id_partida == GameUser.id_partida)
        .filter(GameUser.id_usuario == id_usuario)
        .all()
    )
    return partidas

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
        

@app.post('/endgame')
async def endgame(game_data : EndGameData, db: Session =  Depends(get_db)):
    url = "http://localhost:11434/api/chat"

    prompt_messages = [
        {
            "role": "system",
            "content": (
                "You are Magnus Carlsen, the greatest chess player in history. "
                "You are now analyzing a full chess game (under 150 moves total) based on its move history. "
                "Your task is to provide a detailed evaluation of the overall game quality. "
                "Return three things in JSON format:\n\n"
                "1. 'summary': A brief assessment (max 150 words) of how the game progressed, including major mistakes, blunders, or brilliant moments.\n"
                "2. 'advice': Up to 3 tips for the player(s) to improve based on patterns or typical errors you noticed.\n"
                "3. 'estimated_rating': An estimated ELO rating range (e.g., 1200-1400) that matches the level of play shown.\n\n"
                "Only base your analysis on the moves provided, not on external knowledge or databases. "
                "Be honest, constructive, and accurate. Assume standard time control unless otherwise specified."
                "Do not any string other than the json, no intros like 'here is your json'"
            )
        },
        {
            "role": "user",
            "content": json.dumps(game_data.partida.moves)
        }
    ]

    data_to_send = {
        "model": "llama3.2:latest",
        "messages": prompt_messages,
        "stream": False,
    }

    # obtenemos el id del usuario
    db_user = db.query(User).filter(
        (User.username == game_data.partida.winner)
    ).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="User not logged in")

    user_id = db_user.id_usuario

    newPartida = Game(
        movimientos= json.dumps(game_data.partida.moves),
        ganador= game_data.partida.winner,
        fecha=datetime.now()
    )

    # creamos la partida en la base de datos
    db.add(newPartida)
    db.commit()
    db.refresh(newPartida)
    game_id = newPartida.id_partida

    # insertamos en partida usuario
    intermedia = GameUser(id_partida=game_id, id_usuario=user_id)
    db.add(intermedia)
    db.commit()
    db.refresh(intermedia)

    # obtenemos la valoracion
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=data_to_send)
            response.raise_for_status()

            response_json = await  response.json()
            content = response_json.get("message", {}).get("content", "{}")
            content_json = json.loads(content)
            valoracion = Valoracion(
                rating=content_json.get("estimated_rating", "Por decidir"),
                consejos=content_json.get("advice", "Su partida está siendo analizada. Vuelva a intentarlo más tarde"),
                id_partida=game_id
            )

            print(valoracion)
            db.add(valoracion)
            db.commit()
            db.refresh(valoracion)
            return 'ok'

        except Exception as e:
            valoracion = Valoracion(
                rating=1500,
                consejos="Su partida está siendo analizada. Vuelva a intentarlo más tarde",
                id_partida=game_id
            )

            db.add(valoracion)
            db.commit()
            db.refresh(valoracion)
            return 'ok'



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


# uvicorn main:app --reload

# /docs - /redocs