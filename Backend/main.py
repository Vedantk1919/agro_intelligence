from agents.farmer_advisor import FarmerAdvisor
from agents.market_researcher import MarketResearcher
from database_layer.database import init_db, store_result
import json

# Initialize SQLite
init_db()

# Load combined input
with open("inputs/sample_farmer_input.json") as f:
    input_data = json.load(f)

# Initialize agents
advisor = FarmerAdvisor("data/farmer_advisor_dataset.csv")
market = MarketResearcher("data/market_researcher_dataset.csv")

# Run Farmer Advisor with environmental data
farmer_env_data = {
    "Soil_pH": input_data["Soil_pH"],
    "Soil_Moisture": input_data["Soil_Moisture"],
    "Temperature_C": input_data["Temperature_C"],
    "Rainfall_mm": input_data["Rainfall_mm"]
}
advisor_output = advisor.analyze(farmer_env_data)

# Run Market Researcher with market data
market_data = {
    "Market_Price_per_ton": input_data["Market_Price_per_ton"],
    "Demand_Index": input_data["Demand_Index"],
    "Consumer_Trend_Index": input_data["Consumer_Trend_Index"]
}
market_output = market.recommend(market_data)

# Combine output
final_recommendation = {
    "environmental_advice": advisor_output,
    "market_advice": market_output
}

# Print result
print("\n🔍 Final Recommendation:\n")
print(json.dumps(final_recommendation, indent=2))

# Store result in SQLite
store_result(input_data["name"], json.dumps(final_recommendation))
