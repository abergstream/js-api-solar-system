/*
  SEE NUMBER IN CODE, INDEX LIST IN THE TOP FOR A LESS MESSY CODE

  1. FIRST I MADE THE PLANETS PROPORTIONAL TO THE SUN BUT THEY GOT REALLY SMALL
  THEN I MADE THIS SCRIPT, THAT THE PLANETS GETS 5 TIMES THEIR PROPORTIONAL SIZE
    
  2. BUT THE SIZE DIFFERENCE WAS TOO BIG FOR MY TASTE, 
  SO THE SMALLER PLANETS GETS 3 TIMES BIGGER
  AND THE BIGGER PLANETS GETS 1.5 TIMES SMALLER
*/

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
    // GETS THE NUMBER TO MULTIPLY, FOR PROPORTION WITH THE SUN. 3 DECIMALS
    const multiplyBy = (body.circumference / sunCircumference).toFixed(3);
    /*
      1. BIGGER PLANETS
    */
    if (proportional) {
      planetCircumference = maxHeight * multiplyBy;
    } else {
      index != 0
        ? (planetCircumference = maxHeight * multiplyBy * 5)
        : (planetCircumference = maxHeight * multiplyBy);

      /*
      2. EVENING OUT THE SIZES
      */
      planetCircumference < 50 ? (planetCircumference *= 3) : "";
      planetCircumference > 200 ? (planetCircumference /= 1.5) : "";
    }
    const planet = document.createElement("div");
    const name = body.name.toLowerCase();

    planet.style.width = `${planetCircumference}px`;
    planet.style.height = `${planetCircumference}px`;

    // ADD EVENTLISTENER TO VIEW MORE INFO ABOUT THE PLANETS
    planet.addEventListener("click", () => {
      viewPlanet(body);
    });
    // CLOSE BUTTON IN MORE-INFO-MODAL
    closeButton.addEventListener("click", closePlanet);

    // THE BLURRY BACKGROUND IN MODAL WILL CLOSE THE MODAL
    planetInfo.addEventListener("click", (e) => {
      if (e.currentTarget == e.target) {
        closePlanet();
      }
    });

    // ADD ONE MORE CLASS AND QUICKINFO FOR HOVER IF THE BODY IS NOT THE SUN
    if (index != 0) {
      planet.classList.add("solar-system__body", `solar-system__${name}`);
      planet.appendChild(quickInfoFn(body));
    } else {
      planet.classList.add(`solar-system__${name}`);
    }

    solarSystem.appendChild(planet);
  });
}
// INFORMATION THAT SHOWS WHEN HOVERING A PLANET (NOT THE SUN)
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

// MODAL FOR MORE INFORMATION ABOUT THE PLANET
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

  // SORT MOONS BY NAME
  const sortedMoons = planet.moons;
  sortedMoons.sort();

  let moons = "";
  if (sortedMoons.length > 0) {
    sortedMoons.forEach((moon, index) => {
      // DON'T ADD THE COMMA IF THE CONTENT IS LAST IN THE ARRAY
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
  // planetInfo.style.dislay = "flex";
  // planetInfo.style.left = 0;
  planetInfo.style.display = "flex";
  setTimeout(() => {
    planetInfo.style.left = 0;
  }, 200);
}
export function closePlanet() {
  selectedPlanet.classList.remove(`solar-system__${planetClassName}`);
  planetInfo.style.left = "100%";
  setTimeout(() => {
    planetInfo.style.display = "none";
  }, 200);
}
export function generateStars() {
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
