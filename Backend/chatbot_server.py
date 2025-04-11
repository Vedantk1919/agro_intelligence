# chatbot_server.py
from flask import Flask, request, jsonify
from huggingface_hub import InferenceClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend JS to access this backend

client = InferenceClient(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    token="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"
)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("message", "")

    try:
        response = client.text_generation(
            prompt=user_input,
            max_new_tokens=100,
            temperature=0.7,
            do_sample=True
        )
        return jsonify({"status": "success", "reply": response})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
