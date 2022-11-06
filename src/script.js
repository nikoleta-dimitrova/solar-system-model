var solarSystem = document.getElementById("solar-system");
var orbits = document.querySelectorAll(".orbit");
var sun = document.getElementById("sun");

let zoomLevels = [0.15, 0.2 ,0.4, 0.6, 0.8, 1];
let currentZoom = 3;

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

solarSystem.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        zoomIn()
    }
    else if (e.deltaY > 0) {
        zoomOut()
    }
})