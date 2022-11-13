/*
 Each planet is a new object of type Planet class which makes 
 using the planet's properties easier in the code
 */
class Planet {

    // class constructor
    constructor(id, name, size, speed, info, image) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.speed = speed
        this.info = info;
        this.image = image
    }

    // These functions are used to get and set the properties of the class
    setName(name) {
        this.name = name
    }
    getName() {
        return this.name;
    }

    setSize(size) {
        this.size = size
    }
    getSize() {
        return this.size;
    }

    setSpeed(speed) {
        this.speed = speed
    }
    getSpeed() {
        return this.speed;
    }

    setInfo(info) {
        this.info = info
    }
    getInfo() {
        return this.info;
    }

    setImage(image) {
        this.image = image
    }
    getImage() {
        return this.image;
    }
}


// Loading the JSON planet data and returning the response (mock GET request) 
const loadPlanets = (callback) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './json/planets.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


 // Creating a new planet for every object in the JSON file
const init = () => {
    loadPlanets(function (response) {
        var planets = JSON.parse(response);
        planets.forEach(planet => {
            var newPlanet = new Planet(planet.id, planet.name, planet.size, planet.speed, planet.info, planet.image)
            // After creating the planet object, we generate a HTML DOM element
            var container = createPlanetCard(newPlanet);
            document.querySelector(".planets-container").appendChild(container);
        })
    })
}

// Popup DOM element used for the additional planet information
const popup = document.getElementById("planet-popup");
const popupImg = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const closePopupButton = document.getElementById("close");

closePopupButton.addEventListener('click', () => {
    popup.style.display = "none";
})

 // When the user clicks on a planet card, a popup appears displaying additional information
const openPopup = (planet) => {
    popupImg.src = planet.image;
    if (planet.name === "Saturn") {
        popupImg.style.rotate = "-25deg";
    }
    popupTitle.textContent = planet.name;
    popupDescription.textContent = planet.info;
    popup.style.display = "block";
}

 // This function creates a new 'planet-card' instance and adds it to the .planets-container 
const createPlanetCard = (planet) => {

    // Parent DIV creation
    const container = document.createElement("div");
    container.classList.add('planet-card');
    // Planet Image
    const containerImage = document.createElement("img");
    containerImage.classList.add("planet-image")
    containerImage.src = planet.image;

    // Planet Name
    const containerName = document.createElement("span");
    containerName.classList.add("planet-name");
    containerName.textContent = planet.name;

    // Second parent DIV (containing additional information about the planet)
    const planetDetails = document.createElement("div");
    planetDetails.classList.add('planet-details');

    // Displaying information about the planet size
    const planetSize = document.createElement("div");
    planetSize.classList.add('planet-size');
    const sizeImg = document.createElement("img");
    sizeImg.src = "./assets/images/radius.png";
    const planetSizeValue = document.createElement("span");
    planetSizeValue.textContent = planet.size;
    // Appending the child elements to the parent DIV
    planetSize.appendChild(sizeImg)
    planetSize.appendChild(planetSizeValue);

    // Displaying information about the planet speed
    const planetSpeed = document.createElement("div");
    planetSpeed.classList.add('planet-speed');
    const speedImg = document.createElement("img");
    speedImg.src = "./assets/images/speedometer.svg";
    const planetSpeedValue = document.createElement("span");
    planetSpeedValue.textContent = planet.speed;
    // Appending the child elements to the parent DIV
    planetSpeed.appendChild(speedImg)
    planetSpeed.appendChild(planetSpeedValue);

    const arrow = document.createElement("img");
    arrow.classList.add("arrow-img");
    arrow.src = "./assets/images/arrow.svg"

    // Appending the child DIVs to the parent DIV
    planetDetails.appendChild(planetSize);
    planetDetails.appendChild(planetSpeed);


    // Adding everything to the .planet-card DIV
    container.appendChild(containerImage);
    container.appendChild(containerName);
    container.appendChild(planetDetails);
    container.appendChild(arrow);

    container.addEventListener('click', () => {
        openPopup(planet)
    });

    return container;
}

 // When the application loads, the init function is called which gets the JSON data and creates the planet classes 
window.onload = init();
