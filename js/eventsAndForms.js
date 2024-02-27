// This module is for everyting around the form and addEventlisteners to already existing html elements
import createSolarSystem from "./createSolar.js";
import { viewPlanet, closePlanet } from "./createSolar.js";
const planetForm = document.getElementById("planetSearchForm");
const planetSearch = document.getElementById("inputPlanetSearch");
const searchButton = document.getElementById("searchButton");
const planetDataList = document.querySelector(".option-list");
const toggleProportion = document.getElementById("toggleProportion");
const errorMessageWrapper = document.querySelector(".error-message-wrapper");
const errorMessage = document.querySelector(".error-message");
const planetInfo = document.querySelector(".planet-wrapper");
const closeButton = document.querySelector(".planet-info__close");
export default function createOptionList(bodies, onload) {
  // Make the input search lower case
  const planetSearchLowercase = planetSearch.value.toLowerCase();

  // Filter the bodies object to show only matching result with the input search
  const newList = bodies.filter((planet) => {
    const planetNameLowercase = planet.name.toLowerCase();
    return planetNameLowercase.includes(planetSearchLowercase);
  });

  // Empty the optionlist
  planetDataList.textContent = "";
  if (newList.length > 0) {
    // Restore border color to default value if we have a result
    planetSearch.style.borderColor = "";
    searchButton.style.borderColor = "";

    // Optionlist showed on load for some reason, made this to prevent that
    if (!onload) {
      planetDataList.style.display = "block";
    }

    // Loop through matching results
    newList.forEach((planet) => {
      const optionElement = document.createElement("li");
      optionElement.classList.add("option-list__item");
      optionElement.innerHTML = planet.name;
      planetDataList.appendChild(optionElement);
      optionElement.addEventListener("click", () => {
        planetSearch.value = planet.name;
        viewPlanet(planet);
      });
    });
  } else {
    planetDataList.style.display = "none";
  }
}

export function addEventListeners(bodies) {
  // Search for planets on submit
  planetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkPlanet(bodies, planetSearch.value);
  });

  // Show the optionlist when the input text is focused
  planetSearch.addEventListener("focus", () => {
    planetDataList.style.display = "block";
    createOptionList(bodies);
  });

  // Update the optionlist whenever an input is made in the input text
  planetSearch.addEventListener("input", () => {
    createOptionList(bodies);
  });

  // Hide the optionlist when the input text is not focused
  planetSearch.addEventListener("focusout", () => {
    setTimeout(() => {
      planetDataList.style.display = "none";
    }, 200);
  });
  toggleProportion.addEventListener("input", () => {
    createSolarSystem(bodies, toggleProportion.checked);
  });

  // The blurry background in modal will close the modal
  planetInfo.addEventListener("click", (e) => {
    if (e.currentTarget == e.target) {
      closePlanet();
    }
  });

  // Close button in more-info-modal
  closeButton.addEventListener("click", closePlanet);

  // Escape close the modal
  document.body.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      closePlanet();
    }
  });
}

// Search function
function checkPlanet(bodies, planet) {
  // Make the search not case sensitive
  const lowerCasePlanet = planet.toLowerCase();

  // Default to false
  let findPlanet = false;

  // Loop through bodies to see if any body match with search
  bodies.forEach((planet) => {
    const planetName = planet.name.toLowerCase();
    if (planetName == lowerCasePlanet) {
      findPlanet = true;

      // Focuses the button to hide the option list
      searchButton.focus();
      viewPlanet(planet);
    }
  });
  if (!findPlanet) {
    // Make the borders red to show that no result was found
    showError();
  }
}
function showError() {
  const errorColor = "#660700";
  planetSearch.style.borderColor = errorColor;
  searchButton.style.borderColor = errorColor;

  if (planetSearch.value == "") {
    errorMessage.textContent = "Du behöver skriva in något i sökfältet";
  } else {
    errorMessage.innerHTML = `Kunde inte hitta planeten <em>${planetSearch.value}</em>`;
  }
  errorMessageWrapper.style.transform = "translate(-50%, 0%)";
  setTimeout(() => {
    errorMessageWrapper.style.transform = "translate(-50%, -100%)";
  }, 1500);
}
