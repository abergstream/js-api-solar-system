import getBodies from "./getBodies.js";
import createOptionList from "./eventsAndForms.js";
import createSolarSystem from "./createSolar.js";
import { generateStars } from "./createSolar.js";
import { addEventListeners } from "./eventsAndForms.js";

(async () => {
  const bodies = await getBodies();

  // Generate the stars 'background'
  generateStars();

  // Creates the optionlist for the form
  createOptionList(bodies, true);

  // Creates the solar system
  createSolarSystem(bodies, false);

  // Adds eventlisteners
  addEventListeners(bodies);
})();
