from fastapi import FastAPI
from pydantic import BaseModel
from chatbot_logic import chat_with_gemini

app = FastAPI(title="Chatbot API")

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"status": "Chatbot API ready!"}

@app.post("/chat")
def chat(req: ChatRequest):
    reply = chat_with_gemini(req.message)
    return {"reply": reply}
