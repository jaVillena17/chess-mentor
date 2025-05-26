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