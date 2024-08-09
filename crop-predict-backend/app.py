from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import tensorflow as tf

# Load the trained model
model = tf.keras.models.load_model('crop_model.h5')

# Initialize Flask app
app = Flask(__name__)

# Define route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON data from the request
    data = request.json
    
    # Convert incoming data into a DataFrame
    input_data = pd.DataFrame([data])
    
    # Make prediction using the loaded model
    prediction = model.predict(input_data)
    print("Predicted", prediction)
    
    # Identify the label with the highest probability
    predicted_label = np.argmax(prediction, axis=1)
    
    # Map prediction to crop name (replace these with actual crop names)
    crop_mapping = ["Rice", "Maize", "Jute", "Cotton", "Coconut", "Papaya", "Orange", "Apple",
                    "Muskmelon","Watermelon","Grapes", "Mango", "Banana", "Pomegranate", "Lentil",
                    "Blackgram", "MungBean", "MothBeans", "PigeonPeas", "KidneyBeans", "ChickPea", "Coffee"]  # Add all your crop names here
    predicted_crop = crop_mapping[predicted_label[0]]
    print("Predicted_crop", predicted_crop)
    # Return the predicted crop as JSON
    return jsonify({'predicted_crop': predicted_crop})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
