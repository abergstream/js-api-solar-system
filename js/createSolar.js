const solarSystem = document.getElementById("solarSystem");
const planetInfo = document.querySelector(".planet-wrapper");
const selectedPlanet = document.querySelector(".planet-info__planet");
const closeButton = document.querySelector(".planet-info__close");

// Making this variable outside the function because it gets its value in one function and used in another
let planetClassName = "";

export default function createSolarSystem(bodies, proportional) {
  solarSystem.textContent = "";
  let sunCircumference;
  let maxHeight = 500;
  let planetCircumference;
  bodies.forEach((body, index) => {
    if (index == 0) {
      sunCircumference = body.circumference;
    }

    // Gets the number to multiply by for proportion with the sun, 3 decimals
    const multiplyBy = (body.circumference / sunCircumference).toFixed(3);

    // If argument proportional is true, make the planets proportional
    if (proportional) {
      planetCircumference = maxHeight * multiplyBy;
    } else {
      // Else, make the planets 5 times bigger than the actual size
      index != 0
        ? (planetCircumference = maxHeight * multiplyBy * 5)
        : (planetCircumference = maxHeight * multiplyBy);

      // Smaller planets gets 3 times bigger and larger planets gets 1.5 times smaller
      planetCircumference < 50 ? (planetCircumference *= 3) : "";
      planetCircumference > 200 ? (planetCircumference /= 1.5) : "";
    }
    const planet = document.createElement("div");
    const name = body.name.toLowerCase();

    planet.style.width = `${planetCircumference}px`;
    planet.style.height = `${planetCircumference}px`;

    // Add eventlistener to view more info about the planets
    planet.addEventListener("click", () => {
      viewPlanet(body);
    });

    // Close button in more-ionfo-modal
    closeButton.addEventListener("click", closePlanet);

    // The blurry background in modal will close the modal
    planetInfo.addEventListener("click", (e) => {
      if (e.currentTarget == e.target) {
        closePlanet();
      }
    });

    // Add one more class for planets and quickinfo if the body is not the sun
    if (index != 0) {
      planet.classList.add("solar-system__body", `solar-system__${name}`);
      planet.appendChild(quickInfoFn(body));
    } else {
      planet.classList.add(`solar-system__${name}`);
    }

    solarSystem.appendChild(planet);
  });
}

// Information that shows when hovering a planet (not the sun)
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

// Modal for more information about the planet
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

  // Sort moons by name ASC
  const sortedMoons = planet.moons;
  sortedMoons.sort();

  let moons = "";
  if (sortedMoons.length > 0) {
    sortedMoons.forEach((moon, index) => {
      // Don't add comma if the content is last in the array
      index == sortedMoons.length - 1
        ? (moons += `${moon}`)
        : (moons += `${moon}, `);
    });
  } else {
    moons = "Det finns inga upptäckta månar... ännu";
  }
  planetMoons.textContent = moons;
  planetClassName = planet.name.toLowerCase();

  selectedPlanet.classList.add(
    `solar-system__${planetClassName}`,
    "planet-info__planet"
  );

  // Swipe in modal from right to left
  planetInfo.style.left = 0;
  // Set the position to absolute after 500ms to make it scrollable
  setTimeout(() => {
    planetInfo.style.position = "absolute";
  }, 500);
}

export function closePlanet() {
  selectedPlanet.classList.remove(`solar-system__${planetClassName}`);
  // Make the position fixed to hide the x-scroll on the body when the modal is outside the screen
  planetInfo.style.position = "fixed";
  // Move the modal to the right, off the screen
  planetInfo.style.left = "100%";
}
export function generateStars() {
  const stars = document.querySelector(".stars");
  let boxshadow = "";
  const width = window.screen.width;
  const height = window.screen.height;

  for (let i = 1; i <= 700; i++) {
    // Get random position of the stars depending on maxWidth and maxHeight
    const starLeft = Math.floor(Math.random() * width);
    const starTop = Math.floor(Math.random() * height);
    // Use the comma-separator if not in last loop
    i != 700
      ? (boxshadow += `${starLeft}px ${starTop}px rgba(255,255,255,.5), `)
      : (boxshadow += `${starLeft}px ${starTop}px rgba(255,255,255,.5)`);
  }
  // Apply the boxshadow
  stars.style.boxShadow = boxshadow;
}

// Make the numbers more readable
function formatThousands(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}
