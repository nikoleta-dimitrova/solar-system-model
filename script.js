class Planet {

    constructor(id, name, size, speed, info, image) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.speed = speed
        this.info = info;
        this.image = image
    }

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

const init = () => {
    loadPlanets(function (response) {
        var planets = JSON.parse(response);
        planets.forEach(planet => {
            var newPlanet = new Planet(planet.id, planet.name, planet.size, planet.speed, planet.info, planet.image)
            var container = createPlanetCard(newPlanet);
            document.querySelector(".planets-container").appendChild(container);
        })
    })
}

const popup = document.getElementById("planet-popup");
const popupImg = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const closePopupButton = document.getElementById("close");

closePopupButton.addEventListener('click', () => {
    popup.style.display = "none";
})

const openPopup = (planet) => {
        popupImg.src = planet.image;
        popupTitle.textContent = planet.name;
        popupDescription.textContent = planet.info;
        popup.style.display = "block";
}

const createPlanetCard = (planet) => {
    const container = document.createElement("div");
    container.classList.add('planet-card');
    const containerImage = document.createElement("img");
    containerImage.classList.add("planet-image")
    containerImage.src = planet.image;
    const containerName = document.createElement("span");
    containerName.classList.add("planet-name");
    containerName.textContent = planet.name;

    const planetDetails = document.createElement("div");
    planetDetails.classList.add('planet-details');

    const planetSize = document.createElement("div");
    planetSize.classList.add('planet-size');
    const sizeImg = document.createElement("img");
    sizeImg.src = "./assets/images/radius.png";
    const planetSizeValue = document.createElement("span");
    planetSizeValue.textContent = planet.size;
    planetSize.appendChild(sizeImg)
    planetSize.appendChild(planetSizeValue);


    const planetSpeed = document.createElement("div");
    planetSpeed.classList.add('planet-speed');
    const speedImg = document.createElement("img");
    speedImg.src = "./assets/images/speedometer.svg";
    const planetSpeedValue = document.createElement("span");
    planetSpeedValue.textContent = planet.speed;
    planetSpeed.appendChild(speedImg)
    planetSpeed.appendChild(planetSpeedValue);

    const arrow = document.createElement("img");
    arrow.classList.add("arrow-img");
    arrow.src = "./assets/images/arrow.svg"


    planetDetails.appendChild(planetSize);
    planetDetails.appendChild(planetSpeed);

    container.appendChild(containerImage);
    container.appendChild(containerName);
    container.appendChild(planetDetails);
    container.appendChild(arrow);

    container.addEventListener('click', () => {
        openPopup(planet)
    });

    return container;
}

window.onload = init();
