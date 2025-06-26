import requests
import json
import sys
import os

# Configuration
API_URL = "http://localhost:5002/api/query"
OUTPUT_FILE = "chat_history.txt"

def print_welcome():
    print("\n" + "="*50)
    print("       Warranty Chatbot Terminal Interface")
    print("="*50)
    print("Type your questions about product warranties and service issues.")
    print("Type 'exit', 'quit', or 'q' to end the session.")
    print("Type 'history' to see your chat history.")
    print("Type 'clear' to clear the terminal.")
    print("="*50 + "\n")

def check_server_status():
    try:
        response = requests.get("http://localhost:5002/")
        return True
    except requests.exceptions.ConnectionError:
        print("⚠️  Server not running. Make sure your Flask app is running on port 5002.")
        print("   Start your server with: python warranty_bot_app.py")
        return False
    except Exception as e:
        print(f"⚠️  Error checking server status: {str(e)}")
        return False

def save_to_history(question, answer):
    try:
        with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
            f.write(f"Q: {question}\n")
            f.write(f"A: {answer}\n\n")
    except Exception as e:
        print(f"⚠️  Error saving to history: {str(e)}")

def print_history():
    try:
        if not os.path.exists(OUTPUT_FILE):
            print("No chat history yet.")
            return
            
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            history = f.read()
            
        if not history.strip():
            print("Chat history is empty.")
        else:
            print("\n" + "="*50)
            print("               CHAT HISTORY")
            print("="*50)
            print(history)
            print("="*50 + "\n")
    except Exception as e:
        print(f"⚠️  Error reading history: {str(e)}")

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear')

def send_question(question):
    try:
        response = requests.post(
            API_URL,
            json={"prompt": question},
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json().get("response", "No response received.")
        else:
            return f"Error: Received status code {response.status_code}"
    except requests.exceptions.ConnectionError:
        return "Error: Could not connect to the server. Is the Flask app running?"
    except requests.exceptions.Timeout:
        return "Error: Request timed out. The server might be overloaded."
    except Exception as e:
        return f"Error: {str(e)}"

def main():
    clear_terminal()
    print_welcome()
    
    while True:
        try:
            user_input = input("\n👤 You: ").strip()
            
            if user_input.lower() in ['exit', 'quit', 'q']:
                print("\nThank you for using the Warranty Chatbot. Goodbye!")
                break
                
            if user_input.lower() == 'history':
                print_history()
                continue
                
            if user_input.lower() == 'clear':
                clear_terminal()
                print_welcome()
                continue
                
            if not user_input:
                continue
                
            print("\n🤖 Chatbot: ", end="")
            sys.stdout.flush()
            
            answer = send_question(user_input)
            print(answer)
            
            save_to_history(user_input, answer)
            
        except KeyboardInterrupt:
            print("\n\nThank you for using the Warranty Chatbot. Goodbye!")
            break
        except Exception as e:
            print(f"\n⚠️  An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
