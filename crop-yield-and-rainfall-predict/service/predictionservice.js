// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const inputValues = req.body;
//     const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
//     // Call the Python backend with the input values
//     const response = await fetch(`${apiUrl}/predict`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(inputValues),
//     });

//     const data = await response.json();
//     res.status(200).json({ prediction: data.predicted_crop });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
export const croppredict = (
  nitrogen,
  phosphorus,
  potassium,
  temperature,
  humidity,
  pHValue,
  rainfall
) => {
  //   const inputValues = req.body;
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/predict-crop`, {
      method: "POST",
      body: JSON.stringify({
        Nitrogen: parseInt(nitrogen),
        Phosphorus: parseInt(phosphorus),
        Potassium: parseInt(potassium),
        Temperature: parseInt(temperature),
        Humidity: parseInt(humidity),
        pH_Value: parseInt(pHValue),
        Rainfall: parseInt(rainfall),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((e) => reject(e));
  });
};
