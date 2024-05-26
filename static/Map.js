document.addEventListener("DOMContentLoaded", function () {});

function clicked(popup) {
  popup.remove();
}

function check(button, ans, correctAnswer, cont) {
  if (ans === correctAnswer) {
    // Change button color to green
    button.classList.add("correct");
    console.log(button);
    // Disable further selection
    button.disabled = true;
    const buttons = document.querySelectorAll("#" + cont);
    console.log(buttons);
    buttons.forEach((cbutton) => {
      cbutton.disabled = true;
    });
  } else {
    button.classList.add("wrong");
    // Disable further selection
    button.disabled = true;
    // Perform actions for wrong answer, if needed
    // For example, you can display a message or provide a hint
  }
}

function load_questions(questions) {
  // Initialize the map on the "map" div with a given center and zoom
  var map = L.map("map", {
    center: [0, 0], // Centered at (0, 0) (latitude, longitude)
    zoom: 2, // Initial zoom level
    zoomControl: false, // Disable zoom control
  });

  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();

  // Add a tile layer (e.g., OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Define positions of markers for each continent
  var continents = {
    Africa: [0, 20],
    //'Antarctica': [-80, 0],
    Asia: [30, 100],
    Europe: [50, 10],
    North_America: [40, -100],
    Australia: [-20, 140],
    South_America: [-20, -60],
  };

  // Define the custom popup content
  var customIcon = L.icon({
    iconUrl: "/static/images/Map_marker_V2.png", // Default color
    iconSize: [64, 64],
    popupAnchor: [0, -16],
  });

  var customIconHover = L.icon({
    iconUrl: "/static/images/Map_marker_Hover_V2.png", // Hover color
    iconSize: [64, 64],
    popupAnchor: [0, -16],
  });

  // Show Continent Markers with the custom popup and custom icon
  for (var continent in continents) {
    var marker = L.marker(continents[continent], { icon: customIcon }).addTo(
      map,
    );
    var popupContent = `
     <div class='custom-popup'>
          <div class='popup-content'>
              <div class='popup-image'><img src='${questions[continent]["image"]}' alt='Continent Image'></div>
                  <div class='popup-questions'>
                      <h3>Multiple Choice Questions:</h3>
                  <ul>`;

    questions[continent]["answer_bank"].forEach(function (question) {
      popupContent += `<li><button id="${continent}" onclick="check(this, '${question}', '${questions[continent]["person"]}', '${continent}')" class='choice-btn'>${question}</button></li>`;
    });

    /*popupContent += `
                </ul>
            </div>
            <button onclick="clicked(this, '${continent}')" class='popup-close-btn'>Close</button>
        </div>
    </div>`;
    */

    marker.bindPopup(popupContent);

    marker.on(
      "popupopen",
      function (e) {
        var popup = e.popup;
        var tempContainer = document.createElement("div");
        tempContainer.innerHTML = popup.getContent();

        var popupContent =
          tempContainer.getElementsByClassName("custom-popup")[0];
        var choiceButtons = popupContent.getElementsByClassName("choice-btn");

        Array.from(choiceButtons).forEach(function (button) {
          button.addEventListener("click", function () {
            var selectedAnswer = button.textContent.trim();
            var correctAnswer = questions[continent]["person"].trim();
            check(button, selectedAnswer, correctAnswer, button.id);
          });
        });

        var closeButton =
          popupContent.getElementsByClassName("popup-close-btn")[0];
        closeButton.addEventListener("click", function () {
          clicked(popup);
        });
      }.bind(this),
    );

    marker.on("mouseover", function (e) {
      this.setIcon(customIconHover);
    });

    marker.on("mouseout", function (e) {
      this.setIcon(customIcon);
    });
  }

  var bounds = L.latLngBounds(
    L.latLng(-90, -180), // Southwest corner of the world
    L.latLng(90, 180), // Northeast corner of the world
  );

  // Set maximum bounds to prevent panning outside the world
  map.setMaxBounds(bounds);
  map.on("drag", function () {
    map.panInsideBounds(bounds, { animate: false });
  });
}
