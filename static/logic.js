

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [121.6, -24.4], // starting position [lng, lat]
    zoom: 3.6, // starting zoom
    projection: 'globe'
    });
   
map.on('load', () => {
    map.addSource('mines', {
        type: 'geojson',
        data: 'https://github.com/ParkaviMathi/Project_3/blob/main/resources/clean_mines.geojson'
    });

    map.on('style.load', () => {
        map.setFog({}); // enable atmosphere and stars
        });

    map.addLayer({
        'id': 'mines-layer',
        'type': 'circle',
        'source': 'mines',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
        }
    });
});