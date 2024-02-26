import createSolarSystem from "./createSolar.js";
import { viewPlanet, closePlanet } from "./createSolar.js";
const planetForm = document.getElementById("planetSearchForm");
const planetSearch = document.getElementById("inputPlanetSearch");
const searchButton = document.getElementById("searchButton");
const planetDataList = document.querySelector(".option-list");
const toggleProportion = document.getElementById("toggleProportion");

export default function createOptionList(bodies, onload) {
  const planetSearchLowercase = planetSearch.value.toLowerCase();
  const newList = bodies.filter((planet) => {
    const planetNameLowercase = planet.name.toLowerCase();
    return planetNameLowercase.includes(planetSearchLowercase);
  });
  planetDataList.textContent = "";
  if (newList.length > 0) {
    planetSearch.style.borderColor = "";
    searchButton.style.borderColor = "";
    if (!onload) {
      planetDataList.style.display = "block";
    }
    newList.forEach((planet) => {
      const optionElement = document.createElement("li");
      optionElement.classList.add("option-list__item");
      optionElement.innerHTML = planet.name;
      planetDataList.appendChild(optionElement);
      optionElement.addEventListener("click", () => {
        planetSearch.value = planet.name;
      });
    });
  } else {
    planetDataList.style.display = "none";
  }
}

export function addEventListeners(bodies) {
  planetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkPlanet(bodies, planetSearch.value);
  });
  planetSearch.addEventListener("input", () => {
    createOptionList(bodies);
  });
  planetSearch.addEventListener("focus", () => {
    planetDataList.style.display = "block";
    createOptionList(bodies);
  });
  planetSearch.addEventListener("focusout", () => {
    setTimeout(() => {
      planetDataList.style.display = "none";
    }, 200);
  });
  document.body.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      closePlanet();
    }
  });
  toggleProportion.addEventListener("input", () => {
    createSolarSystem(bodies, toggleProportion.checked);
  });
}

function checkPlanet(bodies, planet) {
  const lowerCasePlanet = planet.toLowerCase();
  let findPlanet = false;
  bodies.forEach((planet) => {
    const planetName = planet.name.toLowerCase();
    if (planetName == lowerCasePlanet) {
      findPlanet = true;
      searchButton.focus();
      console.log(planet);
      viewPlanet(planet);
    }
  });
  if (!findPlanet) {
    console.log("Planeten finns inte");
    const errorColor = "#660700";
    planetSearch.style.borderColor = errorColor;
    searchButton.style.borderColor = errorColor;
  }
}
