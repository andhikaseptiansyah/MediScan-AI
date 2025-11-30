import requests

BASE_URL = "http://127.0.0.1:8000/chat"

print("🔹 Test Chatbot (ketik 'exit' untuk keluar)")

while True:
    msg = input("You: ")
    if msg.lower() == "exit":
        break

    try:
        res = requests.post(BASE_URL, json={"message": msg})
        data = res.json()
        print("Bot:", data.get("reply", "Tidak ada balasan dari server"))
    except Exception as e:
        print("Error:", e)
