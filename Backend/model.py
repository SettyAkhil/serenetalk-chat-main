# model.py

import os
from openai import OpenAI

# --------------------------------------------------
# HUGGING FACE CONFIG
# --------------------------------------------------
MODEL_NAME = "meta-llama/Llama-3.2-1B-Instruct:featherless-ai"

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN")
)

# --------------------------------------------------
# SYSTEM PROMPT BASE
# --------------------------------------------------
BASE_SYSTEM_PROMPT = """
You are a compassionate, calm, and emotionally supportive mental health assistant.

STRICT RULES:
- Respond with empathy and emotional validation only
- Do NOT give advice, solutions, or instructions
- Do NOT ask follow-up questions
- Do NOT encourage dependency
- Do NOT mention policies or being an AI
- Keep responses short (2–4 sentences)
- Match the user's emotional tone.
"""

# --------------------------------------------------
# LANGUAGE RULES
# --------------------------------------------------
LANGUAGE_RULES = {
    "en": "Respond ONLY in English. Do NOT use any other language.",
    "hi": "केवल हिंदी में उत्तर दें। किसी अन्य भाषा का उपयोग न करें।",
    "te": "కేవలం తెలుగులో మాత్రమే సమాధానం ఇవ్వండి. ఇతర భాషలు ఉపయోగించవద్దు."
}

# --------------------------------------------------
# FALLBACK RESPONSES
# --------------------------------------------------
FALLBACK_RESPONSES = {
    "en": "I'm here with you, and what you're feeling matters.",
    "hi": "मैं यहाँ आपके साथ हूँ, और आपकी भावनाएँ महत्वपूर्ण हैं।",
    "te": "నేను మీతోనే ఉన్నాను, మీరు అనుభవిస్తున్న భావాలు ముఖ్యమైనవే."
}

# --------------------------------------------------
# LANGUAGE DETECTION
# --------------------------------------------------
def detect_language(text: str) -> str:
    for ch in text:
        if "\u0C00" <= ch <= "\u0C7F":
            return "te"
        if "\u0900" <= ch <= "\u097F":
            return "hi"
    return "en"

# --------------------------------------------------
# HUGGING FACE API CALL
# --------------------------------------------------
def call_model(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are a compassionate mental health assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=250
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("Hugging Face Error:", e)
        return ""

# --------------------------------------------------
# CHAT RESPONSE
# --------------------------------------------------
def chat_response(message: str, session_id: str, selected_language: str = "en"):

    message = message.strip()

    input_language = detect_language(message)

    # Language mismatch
    if input_language != selected_language:
        warnings = {
            "en": "Please continue the conversation in English.",
            "hi": "कृपया केवल हिंदी में ही संदेश भेजें।",
            "te": "దయచేసి తెలుగులో మాత్రమే సందేశం పంపండి."
        }
        return warnings.get(selected_language, warnings["en"])

    system_prompt = f"""
{BASE_SYSTEM_PROMPT}

{LANGUAGE_RULES.get(selected_language)}
"""

    final_prompt = f"""
{system_prompt}

User message:
{message}
"""

    try:
        reply = call_model(final_prompt)

        if not reply:
            return FALLBACK_RESPONSES.get(
                selected_language,
                FALLBACK_RESPONSES["en"]
            )

        return reply

    except Exception as e:
        print("Error:", e)
        return FALLBACK_RESPONSES.get(
            selected_language,
            FALLBACK_RESPONSES["en"]
        )