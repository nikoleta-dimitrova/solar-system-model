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
    popupTitle.textContent = planet.name;
    popupDescription.textContent = planet.info;
    popup.style.display = "block";
}

 // This function creates a new 'planet-card' instance and adds it to the .planets-container 
export const createPlanetCard = (planet) => {

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