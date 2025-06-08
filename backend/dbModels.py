from sqlalchemy import Column, Integer, String, Date, Table, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "Usuario"

    id_usuario = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    contraseña = Column(String)

class Game(Base):
    __tablename__ = "Partida"

    id_partida = Column(Integer, primary_key=True, index=True)
    movimientos = Column(String, unique=False, index=True)
    ganador = Column(String, unique=False, index=True)
    fecha = Column(Date, unique=False, index=True)

class GameUser(Base):
    __tablename__ = "Usuario_Partida"

    id_partida = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, primary_key=True, index=True)


class Valoracion(Base):
    __tablename__ = "Valoracion"

    id_valoracion = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, primary_key=False, index=True)
    consejos = Column(Integer, primary_key=False, index=True)
    id_partida = Column(Integer, primary_key=False, index=True)