document.addEventListener('DOMContentLoaded', function () {
    

    
})

function clicked(cont) {
    console.log(cont, "LSLWFLEFELFLFWE")
}

function check(ans) {
    console.log(ans)
}

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
        var marker = L.marker(continents[continent], {icon: customIcon}).addTo(map);
        var popupContent = "<div class='custom-popup'>" +
                                "<div class='popup-content'>" +
                                    "<div class='popup-image'><img src='" + questions[continent]['image'] + "' alt='Continent Image'></div>" +
                                    "<div class='popup-questions'>" +
                                        "<h3>Multiple Choice Questions:</h3>" +
                                        "<ul>";
    
        questions[continent]['answer_bank'].forEach(function(question) {
            popupContent += `<li><button onclick="check('${question}')"class='choice-btn'>${question}</button></li>`})

        popupContent += `    
                </ul>
            </div>
        <button onclick="clicked('${continent}')" class='popup-close-btn'>Close</button>
        </div>
    </div>`

    
        marker.bindPopup(popupContent);

        marker.bindPopup(popupContent);

        marker.on('popupopen', function(e) {
            var popup = e.popup;
            var tempContainer = document.createElement('div');
            tempContainer.innerHTML = popup.getContent();
        
            var popupContent = tempContainer.getElementsByClassName('custom-popup')[0];
            var choiceButtons = popupContent.getElementsByClassName('choice-btn');
        
            Array.from(choiceButtons).forEach(function(button) {
                button.addEventListener('click', function() {
                    console.log('clicked')
                    var selectedAnswer = button.textContent.trim(); // Trim to remove extra spaces
                    var correctAnswer = questions[continent]['person'].trim(); // Trim to remove extra spaces
                    if (selectedAnswer === correctAnswer) {
                        button.classList.add('correct');
                    } else {
                        button.classList.add('wrong');
                    }
                    // Disable further selection after an answer is chosen
                    Array.from(choiceButtons).forEach(function(btn) {
                        btn.disabled = true;
                    });
                });
            });
        
            var closeButton = popupContent.getElementsByClassName('popup-close-btn')[0];
            closeButton.addEventListener('click', function() {
                popup.remove();
            });
        });

        marker.on('mouseover', function(e) {
            this.setIcon(customIconHover);
        });
    
        marker.on('mouseout', function(e) {
            this.setIcon(customIcon);
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