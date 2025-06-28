var map = L.map('map').setView([43.65, -79.38], 8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
navigator.geolocation.watchPosition(success, error);

function success(position)
{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    let marker = L.marker([lat, lon]).addTo(map);
    let circle = L.circle([lat, lon]).addTo(map);

    map.fitBounds(circle.getBounds());
    }

farms = [];
