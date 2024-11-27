const fetchVehiclesMakes = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`, {
      method: "GET",
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default fetchVehiclesMakes;
