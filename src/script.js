var solarSystem = document.getElementById("solar-system");
var orbits = document.querySelectorAll(".orbit");
var sun = document.getElementById("sun");

let zoomLevels = [0.15, 0.2, 0.4, 0.6, 0.8, 1];
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
    _offsetYOrbits = []
}

solarSystem.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        zoomIn()
    }
    else if (e.deltaY > 0) {
        zoomOut()
    }
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

