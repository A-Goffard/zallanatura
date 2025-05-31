// Inicializar el mapa
var map = L.map('map').setView([43.2171, -3.1344], 13); // Coordenadas aproximadas de Zalla

// Añadir capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Crear icono personalizado con la imagen localizador.png
var customIcon = L.icon({
    iconUrl: 'images/icons/localizador.png', // Ruta a tu imagen
    iconSize: [30, 40], // Tamaño del icono (ajústalo según tu imagen)
    iconAnchor: [15, 40], // Punto de anclaje del icono
    popupAnchor: [0, -40], // Punto de anclaje del popup
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Sombra opcional
    shadowSize: [41, 41], // Tamaño de la sombra
    shadowAnchor: [12, 41] // Punto de anclaje de la sombra
});

// Añadir marcadores con el icono personalizado
var actividades = [
    { coords: [43.203296, -3.169548], texto: 'Plantación y lanzamiento de bombas de semillas en Landabaso eskola aktiboa', icon: customIcon },
    { coords: [43.214695, -3.130323], texto: 'Creación de un oasis de mariposas en el parque de Lusa', icon: customIcon },
    { coords: [43.213692, -3.133904], texto: 'Taller de pintar mariposas', icon: customIcon },
    { coords: [43.213829, -3.134368], texto: 'Ruta para conocer los árboles de Zalla', icon: customIcon }
];

actividades.forEach(function(actividad) {
    L.marker(actividad.coords, { icon: actividad.icon }).addTo(map)
        .bindTooltip(actividad.texto, { permanent: false, direction: 'top' });
});
