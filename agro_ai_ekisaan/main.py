import speech_recognition as sr
from gtts import gTTS
from playsound import playsound
import joblib
import requests
import os
import datetime

# Load the crop prediction model
model = joblib.load("crop_model.pkl")

# API Key for OpenWeatherMap
API_KEY = "93e9f051fa436e4853782607559bc198"
LOG_FILE = "conversation_log.txt"
TEMP_AUDIO_FILE = "voice.mp3"

# Crop mappings (Hindi-English) and fertilizer/pesticide info
crop_dict = {
    "गेहूं": "wheat", "धान": "rice", "मक्का": "maize",
    "चना": "gram", "सरसों": "mustard", "cotton": "cotton",
    "rice": "rice", "wheat": "wheat", "maize": "maize",
    "gram": "gram", "mustard": "mustard"
}

crop_info = {
    "wheat": {"fertilizer": "Use NPK 2:1:1 ratio", "pesticide": "Use Chlorpyrifos for pests"},
    "rice": {"fertilizer": "Use urea and DAP", "pesticide": "Use Carbofuran for insects"},
    "maize": {"fertilizer": "Apply 120 kg N/ha", "pesticide": "Use Atrazine for weeds"},
    "mustard": {"fertilizer": "Apply urea + SSP", "pesticide": "Use Dimethoate for aphids"},
    "gram": {"fertilizer": "DAP + FYM is good", "pesticide": "Use Malathion for pests"},
    "cotton": {"fertilizer": "Apply NPK + potash", "pesticide": "Use Imidacloprid for whitefly"},
}

# Text-to-speech
def speak(text):
    print("👩‍🌾 e-Kisaan:", text)
    tts = gTTS(text=text, lang='hi')
    tts.save(TEMP_AUDIO_FILE)
    playsound(TEMP_AUDIO_FILE)
    os.remove(TEMP_AUDIO_FILE)
    log_conversation("e-Kisaan", text)

# Log interactions
def log_conversation(speaker, text):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"{datetime.datetime.now()} - {speaker}: {text}\n")

# Listen from microphone and convert to text
def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎤 Listening...")
        audio = recognizer.listen(source)
    try:
        text = recognizer.recognize_google(audio, language='hi-IN').lower()
        print("You said:", text)
        log_conversation("User", text)
        return text
    except sr.UnknownValueError:
        speak("माफ़ कीजिए, मैं समझ नहीं पाई। फिर से कहिए।")
    except sr.RequestError:
        speak("नेटवर्क में समस्या है। कृपया बाद में प्रयास करें।")
    return ""

# Fetch weather from API
def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url).json()
    if "main" in response:
        temp = response["main"]["temp"]
        humidity = response["main"]["humidity"]
        desc = response["weather"][0]["description"]
        speak(f"{city} में तापमान {temp}°C, आर्द्रता {humidity}%, और मौसम {desc} है।")
    else:
        speak("शहर का मौसम नहीं मिल पाया। कृपया नाम जांचें।")

# Predict best crop
def predict_crop(pH, moisture, temp):
    try:
        input_data = [[float(pH), float(moisture), float(temp)]]
        prediction = model.predict(input_data)[0]
        speak(f"इन परिस्थितियों में {prediction} उगाना सबसे अच्छा रहेगा।")
        return prediction
    except:
        speak("इनपुट मान सही नहीं है। कृपया संख्याएँ बताएं।")
        return ""

# Provide fertilizer/pesticide suggestions
def get_crop_suggestion(query, type_):
    for name, eng_crop in crop_dict.items():
        if name in query:
            suggestion = crop_info.get(eng_crop, {}).get(type_)
            if suggestion:
                speak(f"{name} के लिए सुझावित {('खाद' if type_ == 'fertilizer' else 'दवा')}: {suggestion}")
            else:
                speak(f"{name} के लिए जानकारी उपलब्ध नहीं है।")
            return
    speak("कृपया फसल का नाम बताएं जिससे मैं सुझाव दे सकूं।")

# Assistant main loop
def assistant():
    speak("नमस्ते! मैं आपका e-Kisaan सहायक हूँ। आप मुझसे मौसम, फसल, खाद या कीटनाशक के बारे में पूछ सकते हैं।")

    while True:
        query = listen()
        if not query:
            continue

        # Exit
        if any(word in query for word in ["बंद करो", "exit", "चुप", "bye", "बाय"]):
            speak("धन्यवाद! खेती में सफलता मिले।")
            break

        # Weather
        elif "मौसम" in query or "weather" in query:
            speak("कृपया शहर का नाम बताएं।")
            city = listen()
            if city: get_weather(city)

        # Crop prediction
        elif "फसल बताओ" in query or "which crop" in query or "crop" in query:
            speak("कृपया pH स्तर बताएं।")
            pH = listen()
            speak("अब नमी स्तर बताएं।")
            moisture = listen()
            speak("अब तापमान बताएं।")
            temp = listen()
            if pH and moisture and temp:
                predict_crop(pH, moisture, temp)

        # Fertilizer
        elif "खाद" in query or "fertilizer" in query:
            get_crop_suggestion(query, "fertilizer")

        # Pesticide
        elif "दवा" in query or "pesticide" in query or "कीटनाशक" in query:
            get_crop_suggestion(query, "pesticide")

        else:
            speak("माफ़ कीजिए, ये कमांड मैं नहीं समझ पाई। कृपया फिर से कहें।")

# Run the assistant
assistant()
