class Planet {

    constructor(id, name, size, info, image) {
        this.id = id;
        this.name = name;
        this.size = size;
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
            var newPlanet = new Planet(planet.id, planet.name, planet.size, planet.info, planet.image)
            var container = createPlanetCard(newPlanet);
            document.querySelector(".planets-container").appendChild(container);
        })
    })
}

const createPlanetCard = (planet) => {
    const container = document.createElement("div");
    container.classList.add('planet-card');
    const containerImage = document.createElement("img");
    containerImage.src = planet.image;
    const containerName = document.createElement("span");
    containerName.textContent = planet.name;

    const planetDetails = document.createElement("div");
    planetDetails.classList.add('planet-details');

    const planetSize = document.createElement("div");
    planetSize.classList.add('planet-size');
    const sizeImg = document.createElement("img");
    sizeImg.src="./assets/images/vector-svg-graphic-11-512.webp";
    const planetSizeValue = document.createElement("span");
    planetSizeValue.textContent = planet.size;
    planetSize.appendChild(sizeImg)
    planetSize.appendChild(planetSizeValue);


    const planetSpeed = document.createElement("div");
    planetSpeed.classList.add('planet-speed');
    const speedImg = document.createElement("img");
    speedImg.src="./assets/images/speedometer.svg";
    const planetSpeedValue = document.createElement("span");
    planetSpeedValue.textContent = planet.size;
    planetSpeed.appendChild(speedImg)
    planetSpeed.appendChild(planetSpeedValue);


    planetDetails.appendChild(planetSize);
    planetDetails.appendChild(planetSpeed);

    container.appendChild(containerImage);
    container.appendChild(containerName);
    container.appendChild(planetDetails);

    return container;
}

window.onload = init();

var solarSystem = document.getElementById("solar-system");
var orbits = document.querySelectorAll(".orbit");
var sun = document.getElementById("sun");

let zoomLevels = [0.08, 0.1, 0.15, 0.2, 0.4, 0.6, 0.8, 1];
let currentZoom = 3;
var _startX = 0;
var _startY = 0;
var _offsetXSun = 0;
var _offsetYSun = 0;
let _offsetXOrbits = [];
let _offSetYOrbits = [];

const zoomOut = () => {
    if (currentZoom > 0) {
        currentZoom--;
        orbits.forEach(orbit => {
            orbit.style.scale = zoomLevels[currentZoom];
        });
        sun.style.scale = zoomLevels[currentZoom];
    }
}

const zoomIn = () => {
    if (currentZoom < zoomLevels.length - 1) {
        currentZoom++;
        orbits.forEach(orbit => {
            orbit.style.scale = zoomLevels[currentZoom];
        });
        sun.style.scale = zoomLevels[currentZoom];
    }
}

const OnMouseMove = (event) => {
    for (var i = 0; i < orbits.length; i++) {
        orbits[i].style.left = (_offsetXOrbits[i] + event.clientX - _startX) + 'px';
        orbits[i].style.top = (_offsetYOrbits[i] + event.clientY - _startY) + 'px';
    }
    sun.style.left = (_offsetXSun + event.clientX - _startX) + 'px';
    sun.style.top = (_offsetYSun + event.clientY - _startY) + 'px';
}

const mouseUp = () => {
    solarSystem.onmousemove = null;
    _offsetXOrbits = [];
    _offsetYOrbits = [];
}

solarSystem.addEventListener('wheel', (e) => {
    setTimeout(() => {
        if (e.deltaY < 0) {
            zoomIn()
        }
        else if (e.deltaY > 0) {
            zoomOut()
        }
    }, 200);
})

solarSystem.addEventListener('mousedown', (event) => {
    solarSystem.onmousemove = OnMouseMove
    solarSystem.onmouseleave = mouseUp
    _startX = event.clientX;
    _startY = event.clientY;
    orbits.forEach(orbit => {
        _offsetXOrbits.push(orbit.offsetLeft);
        _offsetYOrbits.push(orbit.offsetTop);
    })
    _offsetXSun = sun.offsetLeft;
    _offsetYSun = sun.offsetTop;
});

solarSystem.addEventListener('mouseup', mouseUp)

