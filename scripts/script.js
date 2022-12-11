import { Planet } from "./planet.js";
import { createPlanetCard } from "./planetCards.js";

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
export const init = () => {
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

window.onload = init();