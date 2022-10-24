

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [121.6, -24.4], // starting position [lng, lat]
    zoom: 3.6, // starting zoom
    });
   
// map.on('style.load', () => {    
//     map.addSource('mine-data', {
//         type: 'geojson',
//         data: 'resources/operating_mines.json'
// });

// map.addlayer({
//     'id': 'mines',
//     'type': 'circle'
//     'source': 'mine-data',
//     'paint': {
//         'circle-radius': 4,
//         'circle-color': 'red'
//     }
    
// })

// // function createMarkers(response) {
// //     let mines = response.data.MINE;
// //     let mineMarkers = [];

// //     for (let index = 0; index <MINE.length; index++) {
// //         let mine = mines[index];

// //         let mineMarker = L.marker([MINE.LATITUDE, MINE.LONGITUDE])
// //             .bindPopup("<h3>" + MINE.SHORT_TITLE + "<h3><h3>Commodity: " + MINE.TARGET_GROUP_NAME + "</h3>");

// //         mineMarkers.push(mineMarker);
// //     }
// // }