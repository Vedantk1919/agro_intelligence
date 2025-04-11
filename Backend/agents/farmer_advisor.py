import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

class FarmerAdvisor:
    def __init__(self, dataset_path):
        self.df = pd.read_csv(dataset_path)

        # Encode target label
        self.le = LabelEncoder()
        self.df["Crop_Type_Label"] = self.le.fit_transform(self.df["Crop_Type"])

        # Features & labels
        X = self.df[["Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm"]]
        y = self.df["Crop_Type_Label"]

        # Train model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X, y)

    def analyze(self, farmer_data):
        # Extract features from input JSON
        input_features = [[
            float(farmer_data["Soil_pH"]),
            float(farmer_data["Soil_Moisture"]),
            float(farmer_data["Temperature_C"]),
            float(farmer_data["Rainfall_mm"])
        ]]

        # Predict
        pred_label = self.model.predict(input_features)[0]
        predicted_crop = self.le.inverse_transform([pred_label])[0]

        return {
            "recommended_crop": predicted_crop,
            "tip": "Crop recommended using ML based on environmental input values."
        }
