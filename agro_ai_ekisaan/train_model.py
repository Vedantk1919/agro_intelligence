import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load the dataset from full path (note the 'r' before string to handle backslashes)
df = pd.read_csv(r"C:\Users\Kashish\OneDrive\Desktop\hackthefuture\farmer_advisor_dataset _2.csv")

# Rename columns for simplicity
df.rename(columns={
    'Soil_pH': 'pH',
    'Soil_Moisture': 'Moisture',
    'Temperature_C': 'Temperature',
    'Crop_Type': 'Crop'
}, inplace=True)

# Select features and target
X = df[['pH', 'Moisture', 'Temperature']]
y = df['Crop']

# Train the model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model
joblib.dump(model, 'crop_model.pkl')

print("✅ Model trained and saved as 'crop_model.pkl'")
