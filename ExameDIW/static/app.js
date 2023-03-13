// crea un objeto L.map con el id 'map'
var map = L.map('mapid').setView([36.7201600, -4.4203400], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
    .then(response => response.json())
    .then(data => {
        // recorre cada objeto del JSON
        data.forEach(ruta => {
            // coordenadas x e y

            var x = ruta.properties.x;
            console.log(x);
            var y = ruta.properties.y;
            console.log(y);

            // añade la fila a la tabla con el nombre y dirección
            var table = document.getElementById('table-rutas');
            var row = table.insertRow(-1);
            var cellNombre = row.insertCell(0);

            //comprueba y muestra los elementos existentes en la tabla
            var contenido = '';
            if (ruta.properties.nombre) {
                contenido += '<h6>' + ruta.properties.nombre + '</h6>';
            }
            if (ruta.properties.horario) {
                contenido += '<span class="text-sm-start">' + ruta.properties.horario + '</span><br><br>';
            }
            if (ruta.properties.direccion) {
                contenido += '<span class="bg-primary text-white fs-6" style="display:inline-block;padding: 3px; margin-left:5px; border-radius: 5px;">' + ruta.properties.direccion + '</span>';
            }
            if (ruta.properties.telefono) {
                contenido += '<span class="bg-primary text-white fs-6" style="display:inline-block;padding: 3px; margin-left:5px; border-radius: 5px;">' + ruta.properties.telefono + '</span>';
            }
            cellNombre.innerHTML = contenido;

            // marcador con las coordenadas x e y
            var marker = L.marker([x, y]).addTo(map);

            // etiqueta para el marcador con el nombre y dirección
            var label = '<b>' + ruta.properties.nombre + '</b><br/>' + ruta.properties.direccion;

            // etiqueta al marcador
            marker.bindPopup(label);

        });
    });
