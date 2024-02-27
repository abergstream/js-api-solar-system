const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";
const GET_KEY = "keys";
const GET_PLANETS = "bodies";
export default async function getBodies() {
  const checkBodies = localStorage.getItem("bodies");
  let bodies;
  // If there are no bodies in localStorage, go for the API
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
        // store in localStorage
        localStorage.setItem("bodies", JSON.stringify(bodies));
      } catch (error) {
        // Error fetching bodies from API
        alert(
          `Couldn't fetch from bodies from\n${BASE_URL}/${GET_PLANETS}\n\n${error}`
        );
        console.error(
          `Couldn't fetch from bodies from ${BASE_URL}/${GET_PLANETS}: ${error}`
        );
      }
    } catch (error) {
      // Error fetching API_KEY
      alert(`Couldn't fetch API_KEY from\n${BASE_URL}/${GET_KEY}\n\n${error}`);
      console.error(
        `Couldn't fetch API_KEY from ${BASE_URL}/${GET_KEY}: ${error}`
      );
    }
  } else {
    //  Get bodies from localstorage.
    bodies = JSON.parse(localStorage.getItem("bodies"));
  }
  return bodies;
}
