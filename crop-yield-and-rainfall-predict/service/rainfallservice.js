export const rainfall_function = (district, month, year) => {
  //   const inputValues = req.body;
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/rainfall`, {
      method: "POST",
      body: JSON.stringify({
        district: district,
        year: parseInt(year),
        month: parseInt(month),
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
