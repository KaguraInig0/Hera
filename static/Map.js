document.addEventListener('DOMContentLoaded', function () {
    

    
})

function load_questions(questions){
    console.log(questions)
    // Initialize the map on the "map" div with a given center and zoom
    var map = L.map('map', {
        center: [0, 0], // Centered at (0, 0) (latitude, longitude)
        zoom: 2, // Initial zoom level
        zoomControl: false // Disable zoom control
    });
    
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    
    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define positions of markers for each continent
    var continents = {
        'Africa': [0, 20],
        //'Antarctica': [-80, 0],
        'Asia': [30, 100],
        'Europe': [50, 10],
        'North America': [40, -100],
        'Australia': [-20, 140],
        'South America': [-20, -60]
    };

    // Define the custom popup content
    var popupContent = "<div class='custom-popup'><img src='/static/images/Selena.jpeg' height='200px' alt='Custom Popup Image'></div>";

    // Define a custom icon using your PNG asset
    var customIcon = L.icon({
        iconUrl: '/static/images/Map_marker_V2.png', // Default color
        iconSize: [64, 64],
        popupAnchor: [0, -16]
    });
    
    var customIconHover = L.icon({
        iconUrl: '/static/images/Map_marker_Hover_V2.png', // Hover color
        iconSize: [64, 64],
        popupAnchor: [0, -16]
    });

    // Show Continent Markers with the custom popup and custom icon
for (var continent in continents) {
    // Create marker with custom icon
    var marker = L.marker(continents[continent], {icon: customIcon}).addTo(map);
    // Define the custom popup content
    var popupContent = "<div class='custom-popup'>" +
                            "<img src='" + questions[continent]['image'] + "' height='200px' alt='Continent Image'>" +
                            "<h3>Multiple Choice Questions:</h3>" +
                            "<ul>";
    // Add multiple-choice questions to the popup content
    questions[continent]['answer_bank'].forEach(function(question) {
        popupContent += "<li>" + question + "</li>";
    });

    // popupContent += "</ul>" +
    //                  "<button class='popup-close-btn'>Close</button>" +
    //                  "</div>";

    // Bind popup
    marker.bindPopup(popupContent);

    // Change icon on hover
    marker.on('mouseover', function(e) {
        this.setIcon(customIconHover);
    });

    // Change icon back to default on mouseout
    marker.on('mouseout', function(e) {
        this.setIcon(customIcon);
    });

    // Close popup when the close button is clicked
    marker.on('popupopen', function(e) {
        var popup = e.popup;
        var closeButton = document.querySelector('.popup-close-btn');
        closeButton.addEventListener('click', function() {
            popup.remove();
        });
    });
}

    var bounds = L.latLngBounds(
        L.latLng(-90, -180), // Southwest corner of the world
        L.latLng(90, 180)    // Northeast corner of the world
    );

    // Set maximum bounds to prevent panning outside the world
    map.setMaxBounds(bounds);
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: false });
    });

};