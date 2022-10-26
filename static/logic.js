

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/rhockley82/cl9mtn0nf000814o7v7n28efm', // style URL
    center: [121.6, -24.4], // starting position [lng, lat]
    zoom: 3.6, // starting zoom
    projection: 'globe'
    });
   
map.on('load', () => {
    map.addSource('mines', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/ParkaviMathi/Project_3/main/static/clean_mines.geojson',
    });

    map.addLayer({
        'id': 'gold',
        'type': 'circle',
        'source': 'mines',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'yellow',
        },
        'filter': ['==', 'target_group_name', 'GOLD']
    });
    map.addLayer({
        'id': 'bauxite',
        'type': 'circle',
        'source': 'mines',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'red',
        },
        'filter': ['==', 'target_group_name', 'BAUXITE - ALUMINA']
    });
    map.addLayer({
        'id': 'iron',
        'type': 'circle',
        'source': 'mines',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'grey',
        },
        'filter': ['==', 'target_group_name', 'IRON ORE']
    });
    map.addLayer({
        'id': 'nickel',
        'type': 'circle',
        'source': 'mines',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'green',
        },
        'filter': ['==', 'target_group_name', 'NICKEL']
    });
    map.on('idle', () => {
        // If these four layers were not added to the map, abort
        if (!map.getLayer('gold') || !map.getLayer('bauxite') || !map.getLayer('iron') || !map.getLayer('nickel')) {
        return;
        }
         
        // Enumerate ids of the layers.
        const toggleableLayerIds = ['gold', 'bauxite', 'iron', 'nickel'];
         
        // Set up the corresponding toggle button for each layer.
        for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
        continue;
        }
         
        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'active';
         
        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
        const clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
         
        const visibility = map.getLayoutProperty(
        clickedLayer,
        'visibility'
        );
         
        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
        } else {
        this.className = 'active';
        map.setLayoutProperty(
        clickedLayer,
        'visibility',
        'visible'
        );
        }
        };
         
        const layers = document.getElementById('menu');
        layers.appendChild(link);
        }
});
});
