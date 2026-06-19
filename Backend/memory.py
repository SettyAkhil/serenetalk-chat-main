# PURPOSE OF memory.py
    # This file will:
    # Maintain session-based conversation memory
    # Store recent user–assistant messages
    # Prevent unbounded memory growth

from collections import defaultdict, deque

# --------------------------------------------------
# SESSION MEMORY
# --------------------------------------------------

# Each session keeps a rolling window of messages
SESSION_MEMORY = defaultdict(lambda: deque(maxlen=10))


def add_message(session_id: str, role: str, content: str) -> None:
    """
    Add a message to the session memory.
    role: 'user' or 'assistant'
    """
    SESSION_MEMORY[session_id].append({
        "role": role,
        "content": content
    })


def get_conversation_history(session_id: str) -> list[dict]:
    """
    Retrieve conversation history for a session.
    """
    return list(SESSION_MEMORY[session_id])


def clear_session(session_id: str) -> None:
    """
    Clear conversation history for a session.
    """
    if session_id in SESSION_MEMORY:
        SESSION_MEMORY[session_id].clear()
