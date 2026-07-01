export async function sendMessage(message: string) {
    const response = await fetch("https://serenetalk-chat-main-1.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Backend not reachable");
  }

  return response.json();
}
