import getBodies from "./getBodies.js";
import createOptionList from "./planetForm.js";
import createSolarSystem from "./createSolar.js";
import { addEventListeners } from "./planetForm.js";
const planetSearch = document.getElementById("inputPlanetSearch");

(async () => {
  const bodies = await getBodies();

  createOptionList(bodies);
  createSolarSystem(bodies);
  addEventListeners(bodies);
})();
