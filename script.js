var map = L.map('map').setView([43.65, -79.38], 8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([43.77, -79.23]).addTo(map);

fetch('farms.csv').then(response => response.text()).then(csvText => {
    console.log('CSV content:', csvText);
    const lines = csvText.split('\n');
    console.log('Number of lines:', lines.length);
    
    lines.forEach((line, index) => {
        if (line.trim() === '') return; // Skip empty lines
        
        const values = line.split(',');
        console.log('Line', index, 'values:', values);
        
        if (values.length >= 4) {
            const name = values[1];
            const lat = parseFloat(values[2]);
            const lng = parseFloat(values[3]);
            const products = values[4] ? values[4].replace(/"/g, '') : '';
            
            console.log('Creating marker for:', name, 'at', lat, lng);
            
            try {
                const farmMarker = L.marker([lat, lng]).addTo(map);
                farmMarker.bindPopup(`<strong>${name}</strong><br>Products: ${products}`);
                console.log('Marker created successfully for:', name);
            } catch (error) {
                console.error('Error creating marker for:', name, error);
            }
        }
    });
}).catch(error => {
    console.error('Error fetching farms data:', error);
});