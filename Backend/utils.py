# utils.py will do only two things:
    # Detect the language of user input
    # Determine the current time of day

from datetime import datetime
from langdetect import detect, LangDetectException

# --------------------------------------------------
# LANGUAGE DETECTION
# --------------------------------------------------

LANGUAGE_MAP = {
    "en": "en",
    "hi": "hi",
    "te": "te"
}

def detect_language(text: str) -> str | None:
    """
    Detect the language of the given text.
    Returns 'en', 'hi', 'te' or None if detection fails.
    """
    try:
        lang = detect(text)
        return LANGUAGE_MAP.get(lang)
    except LangDetectException:
        return None
    
# --------------------------------------------------
# TIME OF DAY DETECTION
# --------------------------------------------------

def get_time_of_day() -> str:
    """
    Returns one of: 'morning', 'afternoon', 'evening', 'night'
    """
    hour = datetime.now().hour

    if 5 <= hour < 12:
        return "morning"
    elif 12 <= hour < 17:
        return "afternoon"
    elif 17 <= hour < 21:
        return "evening"
    else:
        return "night"
