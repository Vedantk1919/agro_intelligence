from huggingface_hub import InferenceClient

# Initialize the inference client
client = InferenceClient(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    token="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"  # 🔐 Replace with your real token
)

print("You can start chatting with the bot! Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    # Send request to the model
    try:
        response = client.text_generation(
            prompt=user_input,
            max_new_tokens=100,
            temperature=0.7,
            do_sample=True
        )
        print("Bot:", response)
    except Exception as e:
        print("Error:", e)
