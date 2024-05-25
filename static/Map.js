document.addEventListener('DOMContentLoaded', function () {
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
        'Oceania': [-20, 140],
        'South America': [-20, -60]
    };

    // Define the custom popup content
    var popupContent = "<div class='custom-popup'><img src='/static/images/Selena.jpeg' height='200px' alt='Custom Popup Image'></div>";

    // Define a custom icon using your PNG asset
    var customIcon = L.icon({
        iconUrl: '/static/images/Map_marker_V2.png', // Replace '/path/to/custom-marker.png' with the actual path to your custom marker PNG asset
        iconSize: [64, 64], // Adjust the size of the icon as needed
        popupAnchor: [0, -16] // Adjust the popup anchor to position it correctly relative to the icon
    });

    // Show Continent Markers with the custom popup and custom icon
    for (var continent in continents) {
        // Create marker with custom icon and bind popup
        var marker = L.marker(continents[continent], {icon: customIcon}).addTo(map);
        marker.bindPopup(popupContent);
    }
});
