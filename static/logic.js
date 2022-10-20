

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [121.6, -24.4], // starting position [lng, lat]
    zoom: 3.6, // starting zoom
    });
    map.on('style.load', () => {
    });

function createMarkers(response) {
    let mines = response.data.MINE;
    let mineMarkers = [];

    for (let index = 0; index <MINE.length; index++) {
        let mine = mines[index];

        let mineMarker = L.marker([MINE.LATITUDE, MINE.LONGITUDE])
            .bindPopup("<h3>" + MINE.SHORT_TITLE + "<h3><h3>Commodity: " + MINE.TARGET_GROUP_NAME + "</h3>");

        mineMarkers.push(mineMarker);
    }
}