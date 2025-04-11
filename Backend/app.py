from flask import Flask, request, jsonify
from agents.farmer_advisor import FarmerAdvisor
from agents.market_researcher import MarketResearcher
from database_layer.database import init_db, store_result, get_all_recommendations
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize DB and agents
init_db()
advisor = FarmerAdvisor("data/farmer_advisor_dataset.csv")
market = MarketResearcher("data/market_researcher_dataset.csv")

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        input_data = request.get_json()

        # Farmer agent input
        farmer_env_data = {
            "Soil_pH": float(input_data["Soil_pH"]),
            "Soil_Moisture": float(input_data["Soil_Moisture"]),
            "Temperature_C": float(input_data["Temperature_C"]),
            "Rainfall_mm": float(input_data["Rainfall_mm"])
        }
        advisor_output = advisor.analyze(farmer_env_data)

        # Market agent input
        market_data = {
            "Market_Price_per_ton": float(input_data["Market_Price_per_ton"]),
            "Demand_Index": float(input_data["Demand_Index"]),
            "Consumer_Trend_Index": float(input_data["Consumer_Trend_Index"])
        }
        market_output = market.recommend(market_data)

        final_recommendation = {
            "environmental_advice": advisor_output,
            "market_advice": market_output
        }

        # Save to DB
        store_result(input_data["name"], jsonify(final_recommendation).get_data(as_text=True))

        return jsonify({
            "status": "success",
            "recommendation": final_recommendation
        }), 200

    except Exception as e:
        print("❌ Backend Error:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500


# ✅ New Route: Retrieve recommendation history
@app.route('/history', methods=['GET'])
def history():
    try:
        records = get_all_recommendations()
        result = []
        for row in records:
            result.append({
                "farmer_name": row[0],
                "recommendation": row[1],
                "timestamp": row[2]
            })

        return jsonify({
            "status": "success",
            "history": result
        }), 200
    except Exception as e:
        print("❌ Error fetching history:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
