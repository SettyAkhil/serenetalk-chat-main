# PURPOSE OF embeddings.py
    # This file will:
    # Load one embedding model
    # Convert text → vectors
    # Store embeddings per session

from sentence_transformers import SentenceTransformer
from collections import defaultdict
import numpy as np

# --------------------------------------------------
# EMBEDDING MODEL
# --------------------------------------------------

# Load once at startup
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Store embeddings per session
# Each item: {"text": str, "embedding": np.array}
SESSION_EMBEDDINGS = defaultdict(list)


# --------------------------------------------------
# EMBEDDING HELPERS
# --------------------------------------------------

def embed_text(text: str) -> np.ndarray:
    """
    Convert text into an embedding vector.
    """
    return embedding_model.encode(text, convert_to_numpy=True)


def add_embedding(session_id: str, text: str) -> None:
    """
    Store embedding for a given text in a session.
    """
    embedding = embed_text(text)
    SESSION_EMBEDDINGS[session_id].append({
        "text": text,
        "embedding": embedding
    })


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """
    Compute cosine similarity between two vectors.
    """
    if np.linalg.norm(a) == 0 or np.linalg.norm(b) == 0:
        return 0.0
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def retrieve_relevant_context(
    session_id: str,
    query: str,
    top_k: int = 3
) -> list[str]:
    """
    Retrieve top-k semantically relevant past messages.
    """
    if session_id not in SESSION_EMBEDDINGS:
        return []

    query_embedding = embed_text(query)
    scored = []

    for item in SESSION_EMBEDDINGS[session_id]:
        score = cosine_similarity(query_embedding, item["embedding"])
        scored.append((score, item["text"]))

    # Sort by similarity (highest first)
    scored.sort(key=lambda x: x[0], reverse=True)

    return [text for _, text in scored[:top_k]]
