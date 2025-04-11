import requests

def get_weather(city, api_key="93e9f051fa436e4853782607559bc198"):
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": api_key,
        "units": "metric"
    }
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        if response.status_code == 200:
            weather = data["weather"][0]["description"]
            temp = data["main"]["temp"]
            humidity = data["main"]["humidity"]
            return f"Current weather in {city}: {weather}, Temperature: {temp}°C, Humidity: {humidity}%"
        else:
            return f"Sorry, couldn't fetch weather for {city}."
    except Exception as e:
        return f"Error fetching weather: {str(e)}"
