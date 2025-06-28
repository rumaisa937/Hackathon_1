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

async function getFarms()
{
    const response = await fetch('http://localhost:8080/api/farms'); 
    const farms = await response.json();
    //const map = L.map('map').setView([43.65, -79.38], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const farmSelect = document.getElementById('farm-select');

    farms.forEach(farm => {
    L.marker([farm.lat, farm.lng])
      .addTo(map)
      .bindPopup(`<b>${farm.name}</b><br>${farm.produce}`);

    const option = document.createElement('option');
    option.value = farm.id;
    option.textContent = farm.name;
    farmSelect.appendChild(option);
  });

}
getFarms();

