import getBodies from "./getBodies.js";
import createOptionList from "./planetForm.js";
import createSolarSystem from "./createSolar.js";
import { addEventListeners } from "./planetForm.js";

(async () => {
  const bodies = await getBodies();

  createOptionList(bodies, true);
  createSolarSystem(bodies);
  addEventListeners(bodies);
})();
