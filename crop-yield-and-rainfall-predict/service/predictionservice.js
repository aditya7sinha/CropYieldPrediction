export default async function handler(req, res) {
  if (req.method === "POST") {
    const inputValues = req.body;

    // Call the Python backend with the input values
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValues),
    });

    const data = await response.json();
    res.status(200).json({ prediction: data.predicted_crop });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
