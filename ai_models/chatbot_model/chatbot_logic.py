# chatbot_logic.py
from google import genai

API_KEY = "AIzaSyCNeZfVeQ4jN5vIWL3X8iKXDgVFkZ4jOzg"
client = genai.Client(api_key=API_KEY)

MODEL_NAME = "models/gemini-2.5-flash"  # ganti model supaya tersedia

def chat_with_gemini(message: str) -> str:
    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=message
        )
        return response.text
    except Exception as e:
        return f"Maaf, chatbot sedang tidak tersedia. ({e})"

def main():
    print("=== Test Chatbot (ketik 'exit' untuk keluar) ===")
    while True:
        msg = input("You: ")
        if msg.lower() == "exit":
            print("Bot: Bye!")
            break
        reply = chat_with_gemini(msg)
        print("Bot:", reply)

if __name__ == "__main__":
    main()
