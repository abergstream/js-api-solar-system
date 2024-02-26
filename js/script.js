import getBodies from "./getBodies.js";
import createOptionList from "./planetForm.js";
import createSolarSystem from "./createSolar.js";
import { generateStars } from "./createSolar.js";
import { addEventListeners } from "./planetForm.js";

(async () => {
  const bodies = await getBodies();
  generateStars();
  createOptionList(bodies, true);
  createSolarSystem(bodies, false);
  addEventListeners(bodies);
})();
