from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def root():
    return "Hola FastAPI"

@app.get('/curso')
async def root():
    return {"key" : "value"}