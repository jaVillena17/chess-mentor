from datetime import date

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    contraseña: str

class UserOut(BaseModel):
    id_usuario: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class GameCreate(BaseModel):
    movimientos: str
    ganador: str
    fecha: date

class GameOut(GameCreate):
    id_partida: int
    movimientos: str
    ganador: str
    fecha: date

    class Config:
        orm_mode = True

class GameUserCreate(BaseModel):
    id_partida: int
    id_usuario: int

class GameUserOut(GameUserCreate):
    id_partida: int
    id_usuario: int
    class Config:

        orm_mode = True

class ValoracionCreate(BaseModel):
    rating: int
    consejos: int
    id_partida: int

class ValoracionOut(ValoracionCreate):
    id_valoracion: int
    rating: int
    consejos: int
    id_partida: int

    class Config:
        orm_mode = True