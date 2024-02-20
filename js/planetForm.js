const planetDataList = document.querySelector(".option-list");
const planetSearch = document.getElementById("inputPlanetSearch");
export default function createOptionList(bodies) {
  const planetSearchLowercase = planetSearch.value.toLowerCase();

  const newList = bodies.filter((planet) => {
    const planetNameLowercase = planet.name.toLowerCase();
    return planetNameLowercase.includes(planetSearchLowercase);
  });
  planetDataList.textContent = "";
  newList.forEach((planet) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("option-list__item");
    optionElement.innerHTML = planet.name;
    planetDataList.appendChild(optionElement);
    optionElement.addEventListener("click", () => {
      planetSearch.value = planet.name;
    });
  });
}
export function addEventListeners(bodies) {
  const planetForm = document.getElementById("planetSearchForm");

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
}
function checkPlanet(bodies, planet) {
  const lowerCasePlanet = planet.toLowerCase();
  let findPlanet = false;
  bodies.forEach((body) => {
    const planetName = body.name.toLowerCase();
    if (planetName == lowerCasePlanet) {
      // console.log("Planeten finns");
      findPlanet = true;
    }
  });
  if (findPlanet) {
    console.log("Planeten finns");
  } else {
    console.log("Planeten finns inte");
  }
}
