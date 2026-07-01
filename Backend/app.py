# PURPOSE OF app.py
    # app.py will:
        # Create the FastAPI server
        # Expose a /chat endpoint
        # Receive:
        # message
        # session_id
        # language
        # Call chat_response
        # Return the AI response

from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from model import chat_response

# --------------------------------------------------
# FASTAPI APP
# --------------------------------------------------

app = FastAPI(title="Multilingual Mental Health Chatbot")

# --------------------------------------------------
# CORS (adjust frontend URL if needed)
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# REQUEST MODEL
# --------------------------------------------------

class ChatRequest(BaseModel):
    message: str
    session_id: str
    language: str  # 'en', 'hi', 'te'


# --------------------------------------------------
# CHAT ENDPOINT
# --------------------------------------------------

@app.post("/chat")
def chat(request: ChatRequest):
    reply = chat_response(
        message=request.message,
        session_id=request.session_id,
        selected_language=request.language
    )
    return {"reply": reply}


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/")
def health():
    return {"status": "Backend is running"}
