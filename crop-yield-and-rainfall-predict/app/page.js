"use client";
import { useState } from "react";

export default function Home() {
  const [inputValues, setInputValues] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH_Value: "",
    Rainfall: "",
  });

  const [predictedCrop, setPredictedCrop] = useState("");

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValues),
    });
    const data = await response.json();
    setPredictedCrop(data.prediction);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="p-6 font-extrabold text-9xl">Crop Prediction</div>
        <form onSubmit={handleSubmit} className="p-4 m-4">
          {Object.keys(inputValues).map((key) => (
            <div key={key} className="p-3 m-3">
              <label>{key}:</label>
              <input
                type="text"
                name={key}
                value={inputValues[key]}
                onChange={handleChange}
                required
                className="text-black mx-4"
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 m-2 p-2">
            Predict Crop
          </button>
        </form>
        {predictedCrop && (
          <div>
            <h2>Predicted Crop: {predictedCrop}</h2>
          </div>
        )}
      </div>
    </main>
  );
}
