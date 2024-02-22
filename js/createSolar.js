const solarSystem = document.getElementById("solarSystem");
const planetInfo = document.querySelector(".planet-wrapper");
const selectedPlanet = document.querySelector(".planet-info__planet");
const closeButton = document.querySelector(".planet-info__close");

let planetClassName = "";
export default function createSolarSystem(bodies) {
  // const planetList = document.createElement("ul");
  generateStars();
  let sunCircumference;
  let maxHeight = 500;
  let planetCircumference;
  bodies.forEach((body, index) => {
    if (index == 0) {
      sunCircumference = body.circumference;
    }
    const multiplyBy = (body.circumference / sunCircumference).toFixed(3);

    // Make the planets 5 times bigger than the actualy difference to the sun
    index != 0
      ? (planetCircumference = maxHeight * multiplyBy * 5)
      : (planetCircumference = maxHeight * multiplyBy);

    // Make smaller planets bigger
    planetCircumference < 50 ? (planetCircumference *= 3) : "";
    planetCircumference > 200 ? (planetCircumference /= 1.5) : "";
    const planet = document.createElement("div");
    const name = body.name.toLowerCase();

    planet.style.width = `${planetCircumference}px`;
    planet.style.height = `${planetCircumference}px`;

    // Add eventlistener to view more info about the planet
    planet.addEventListener("click", () => {
      viewPlanet(body);
    });
    closeButton.addEventListener("click", closePlanet);
    planetInfo.addEventListener("click", (e) => {
      if (e.currentTarget == e.target) {
        closePlanet();
      }
    });

    // If body isn't the sun
    if (index != 0) {
      planet.classList.add("solar-system__body", `solar-system__${name}`);
      planet.appendChild(quickInfoFn(body));
    } else {
      planet.classList.add(`solar-system__${name}`);
    }

    solarSystem.appendChild(planet);
  });
}
function quickInfoFn(planet) {
  const quickInfoWrapper = document.createElement("div");
  quickInfoWrapper.classList.add("solar-system__quick-info");

  const planetNameElement = document.createElement("h2");
  planetNameElement.classList.add("quick-info__planet");
  planetNameElement.textContent = planet.name;

  const circumferenceElement = document.createElement("div");
  circumferenceElement.textContent = `Omkrets: ${formatThousands(
    planet.circumference
  )} km`;

  const distanceElement = document.createElement("div");
  distanceElement.textContent = `${formatThousands(
    planet.distance
  )} km från solen`;

  const clickForMoreElement = document.createElement("div");
  clickForMoreElement.classList.add("quick-info__click");
  clickForMoreElement.textContent = "KLICKA FÖR MER INFO";
  quickInfoWrapper.append(
    planetNameElement,
    circumferenceElement,
    distanceElement,
    clickForMoreElement
  );
  return quickInfoWrapper;
}
export function viewPlanet(planet) {
  const planetName = document.getElementById("planetName");
  planetName.textContent = planet.name;
  const planetLatinName = document.getElementById("planetLatinName");
  planetLatinName.textContent = planet.latinName;
  const planetDescription = document.getElementById("planetDescription");
  planetDescription.textContent = planet.desc;
  const planetCircumference = document.getElementById("planetCircumference");
  planetCircumference.textContent = `${formatThousands(
    planet.circumference
  )} KM`;
  const planetDistance = document.getElementById("planetDistance");
  planetDistance.textContent = `${formatThousands(planet.distance)} KM`;
  const planetDayTemp = document.getElementById("planetDayTemp");
  planetDayTemp.textContent = `${planet.temp.day}°C`;
  const planetNightTemp = document.getElementById("planetNightTemp");
  planetNightTemp.textContent = `${planet.temp.night}°C`;
  const planetMoons = document.getElementById("planetMoons");
  const sortedMoons = planet.moons;
  sortedMoons.sort();

  let moons = "";
  if (sortedMoons.length > 0) {
    sortedMoons.forEach((moon, index) => {
      // Don't add the comma if the content is last in the array
      index == sortedMoons.length - 1
        ? (moons += `${moon}`)
        : (moons += `${moon}, `);
    });
  } else {
    moons = "Det finns inga upptäckta månar... ännu";
  }
  planetMoons.textContent = moons;
  const name = planet.name.toLowerCase();
  planetClassName = name;
  selectedPlanet.style.position = "static";
  selectedPlanet.style.cursor = "auto";
  selectedPlanet.classList.add(`solar-system__${name}`, "planet-info__planet");
  planetInfo.style.left = 0;
}
export function closePlanet() {
  selectedPlanet.classList.remove(`solar-system__${planetClassName}`);
  planetInfo.style.left = "100%";
}
function generateStars() {
  const stars = document.querySelector(".stars");
  let boxshadow = "";
  const width = window.screen.width;
  const height = window.screen.height;

  for (let i = 1; i <= 500; i++) {
    // Get random position of the stars depending on maxWidth and maxHeight
    const starLeft = Math.floor(Math.random() * width);
    const starTop = Math.floor(Math.random() * height);
    // Use the comma-separator if not in last loop
    i != 500
      ? (boxshadow += `${starLeft}px ${starTop}px #FFF, `)
      : (boxshadow += `${starLeft}px ${starTop}px #FFF`);
  }
  // Apply the boxshadow
  stars.style.boxShadow = boxshadow;
}

function formatThousands(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}
