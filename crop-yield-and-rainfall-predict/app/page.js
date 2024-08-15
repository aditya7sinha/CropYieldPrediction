"use client";
import { useState } from "react";
import { rainfall_function } from "@/service/rainfallservice";
import { croppredict } from "@/service/predictionservice";
export default function Home() {
  const [district, setDistrict] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const handleNitrogenChange = (e) => setNitrogen(e.target.value);

  const [phosphorus, setPhosphorus] = useState("");
  const handlePhosphorusChange = (e) => setPhosphorus(e.target.value);

  const [potassium, setPotassium] = useState("");
  const handlePotassiumChange = (e) => setPotassium(e.target.value);

  const [temperature, setTemperature] = useState("");
  const handleTemperatureChange = (e) => setTemperature(e.target.value);

  const [humidity, setHumidity] = useState("");
  const handleHumidityChange = (e) => setHumidity(e.target.value);

  const [pHValue, setPHValue] = useState("");
  const handlePHValueChange = (e) => setPHValue(e.target.value);

  const [rainfall, setRainfall] = useState("");
  const handleRainfallChange = (e) => setRainfall(e.target.value);

  const handleDistrictChange = (e) => setDistrict(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);

  const [inputValues, setInputValues] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH_Value: "",
    Rainfall: "",
  });

  // const [inputValues2, setInputValues2] = useState({
  //   district: "",
  //   month: "",
  //   year: "",
  // });

  const [predictedCrop, setPredictedCrop] = useState("");
  const [expectedRainfall, setExpectedRainfall] = useState("");

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    // console.log("data being sent", inputValues2);
    rainfall_function(district, year, month)
      .then((data) => {
        console.log("response data:", data);
        setExpectedRainfall(data.predicted_rainfall);
      })
      .catch((e) => console.error(e));
  };

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    croppredict(
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      pHValue,
      rainfall
    )
      .then((data) => {
        console.log("response data:", data);
        setPredictedCrop(data.predicted_crop);
      })
      .catch((e) => console.error(e));
  };

  // const response = await fetch("http://localhost:5000/predict", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(inputValues),
  // });
  // const data = await response.json();
  // setPredictedCrop(data.prediction);
  // const handleSubmit2 = async (e) => {
  //   e.preventDefault();
  //   console.log("data being sent", inputValues2);
  //   rainfall(inputValues2)
  //     .then((data) => {
  //       console.log("response data:", data);
  //       setExpectedRainfall(data.predicted_rainfall);
  //     })
  //     .catch((e) => console.error(e));
  // };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="p-6 font-extrabold text-9xl">Rain Fall Prediction</div>

        <form onSubmit={handleSubmit2} className="p-4 m-4">
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="district">
              District
            </label>
            <input
              className="p-3 m-3 text-black"
              id="district"
              type="text"
              value={district}
              onChange={handleDistrictChange}
              placeholder="District"
            />
          </div>
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="year">
              Year
            </label>
            <input
              className="p-3 m-3 text-black"
              id="year"
              type="year"
              value={year}
              onChange={handleYearChange}
              placeholder="Year"
            />
          </div>
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="month">
              Month
            </label>
            <input
              className="p-3 m-3 text-black"
              id="month"
              value={month}
              onChange={handleMonthChange}
              placeholder="Month"
            ></input>
          </div>
          <div className="p-3 m-3">
            <button type="submit" className="bg-blue-500 m-2 p-2">
              Predict Rainfall
            </button>
          </div>
        </form>
        {expectedRainfall && (
          <div>
            <h2>Rainfall expected: {expectedRainfall}</h2>
          </div>
        )}
      </div>

      <div>
        <div className="p-6 font-extrabold text-9xl">Crop Prediction</div>
        <form onSubmit={handleSubmit} className="p-4 m-4">
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="nitrogen">
              Nitrogen
            </label>
            <input
              className="p-3 m-3 text-black"
              id="nitrogen"
              value={nitrogen}
              onChange={handleNitrogenChange}
              placeholder="Nitrogen"
            />
          </div>

          {/* Phosphorus Input */}
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="phosphorus">
              Phosphorus
            </label>
            <input
              className="p-3 m-3 text-black"
              id="phosphorus"
              value={phosphorus}
              onChange={handlePhosphorusChange}
              placeholder="Phosphorus"
            />
          </div>

          {/* Potassium Input */}
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="potassium">
              Potassium
            </label>
            <input
              className="p-3 m-3 text-black"
              id="potassium"
              value={potassium}
              onChange={handlePotassiumChange}
              placeholder="Potassium"
            />
          </div>

          {/* Temperature Input */}
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="temperature">
              Temperature
            </label>
            <input
              className="p-3 m-3 text-black"
              id="temperature"
              value={temperature}
              onChange={handleTemperatureChange}
              placeholder="Temperature"
            />
          </div>

          {/* Humidity Input */}
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="humidity">
              Humidity
            </label>
            <input
              className="p-3 m-3 text-black"
              id="humidity"
              value={humidity}
              onChange={handleHumidityChange}
              placeholder="Humidity"
            />
          </div>

          {/* pH Value Input */}
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="pHValue">
              pH Value
            </label>
            <input
              className="p-3 m-3 text-black"
              id="pHValue"
              value={pHValue}
              onChange={handlePHValueChange}
              placeholder="pH Value"
            />
          </div>

          {/* Rainfall Input */}
          <div className="mb-4">
            <label className="p-3 m-3" htmlFor="rainfall">
              Rainfall
            </label>
            <input
              className="p-3 m-3 text-black"
              id="rainfall"
              value={rainfall}
              onChange={handleRainfallChange}
              placeholder="Rainfall"
            />
          </div>

          {/* Submit Button */}
          <div className="p-3 m-3">
            <button type="submit" className="bg-blue-500 m-2 p-2">
              Predict Crop
            </button>
          </div>
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
