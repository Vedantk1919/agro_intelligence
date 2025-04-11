import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

class MarketResearcher:
    def __init__(self, dataset_path):
        self.df = pd.read_csv(dataset_path)

        # Encode target
        self.le = LabelEncoder()
        self.df["Product_Label"] = self.le.fit_transform(self.df["Product"])

        # Features and label
        X = self.df[["Market_Price_per_ton", "Demand_Index", "Consumer_Trend_Index"]]
        y = self.df["Product_Label"]

        # Train the model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X, y)

    def recommend(self, market_data):
        # Extract features from input
        input_features = [[
            float(market_data["Market_Price_per_ton"]),
            float(market_data["Demand_Index"]),
            float(market_data["Consumer_Trend_Index"])
        ]]

        # Predict
        pred_label = self.model.predict(input_features)[0]
        predicted_product = self.le.inverse_transform([pred_label])[0]

        return {
            "most_profitable_crop": predicted_product,
            "note": "Predicted using market price, demand index, and trend index."
        }
