const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";
const GET_KEY = "keys"; // Method POST
const GET_PLANETS = "bodies";
export default async function getBodies() {
  const checkBodies = localStorage.getItem("bodies");
  let bodies;
  if (!checkBodies) {
    // Fetch the API_KEY via the method POST
    try {
      const responseKey = await fetch(`${BASE_URL}/${GET_KEY}`, {
        method: "POST",
      });
      const { key: API_KEY } = await responseKey.json();
      // Fetch data with the recent fetched API_KEY
      try {
        const response = await fetch(`${BASE_URL}/${GET_PLANETS}`, {
          method: "GET",
          headers: { "x-zocom": API_KEY },
        });
        const data = await response.json();
        bodies = data.bodies;
        localStorage.setItem("bodies", JSON.stringify(bodies));
        console.log("From: API");
      } catch (error) {
        // Error fetching bodies from API
        console.error(
          `Couldn't fetch from bodies from ${BASE_URL}/${GET_PLANETS}: ${error}`
        );
      }
    } catch (error) {
      // Error fetching API_KEY
      console.error(
        `Couldn't fetch API_KEY from ${BASE_URL}/${GET_KEY}: ${error}`
      );
    }
  } else {
    // console.log("From: localStorage");
    bodies = JSON.parse(localStorage.getItem("bodies"));
  }
  return bodies;
}
