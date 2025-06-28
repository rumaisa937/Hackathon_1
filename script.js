var map = L.map('map').setView([43.65, -79.38], 8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([43.77, -79.23]).addTo(map);

fetch('farms.csv').then(response => response.text()).then(csvText => {const lines = csvText.split('\n');
    lines.forEach((line, index) => {const values = line.split(',');
        console.log(values[2]);
        console.log(values[3]);});
        L.marker([values[2], values[3]]).addTo(map).bindPopup(`<strong>${name}</strong>`);
    
    }).catch(error => {console.error('Error fetching farms data:', error);});