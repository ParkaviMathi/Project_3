const map = new mapboxgl.Map({
<<<<<<< HEAD
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [121.6, -24.4], // starting position [lng, lat]
    zoom: 3.6, // starting zoom
    projection: 'globe'
    });
   
map.on('load', () => {
    map.addSource('mines', {
        type: 'geojson',
        data: 'static/clean_mines.geojson'
        // data: 'https://github.com/ParkaviMathi/Project_3/blob/main/resources/clean_mines.geojson'
    });
=======
  container: "map", // container ID
  style: "mapbox://styles/rhockley82/cl9mtn0nf000814o7v7n28efm", // style URL
  center: [121.6, -24.4], // starting position [lng, lat]
  zoom: 3.6, // starting zoom
  projection: "globe",
});
>>>>>>> 0817d2a61b65f937c92b190207d6f470cddbe0fe

map.on("load", () => {
  map.addSource("mines", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/ParkaviMathi/Project_3/main/static/clean_mines.geojson",
  });

  map.addLayer({
    id: "gold",
    type: "circle",
    source: "mines",
    paint: {
      "circle-radius": 4,
      "circle-stroke-width": 2,
      "circle-color": "yellow",
    },
    filter: ["==", "target_group_name", "GOLD"],
  });
  map.addLayer({
    id: "bauxite",
    type: "circle",
    source: "mines",
    paint: {
      "circle-radius": 4,
      "circle-stroke-width": 2,
      "circle-color": "red",
    },
    filter: ["==", "target_group_name", "BAUXITE - ALUMINA"],
  });
  map.addLayer({
    id: "iron",
    type: "circle",
    source: "mines",
    paint: {
      "circle-radius": 4,
      "circle-stroke-width": 2,
      "circle-color": "grey",
    },
    filter: ["==", "target_group_name", "IRON ORE"],
  });
  map.addLayer({
    id: "nickel",
    type: "circle",
    source: "mines",
    paint: {
      "circle-radius": 4,
      "circle-stroke-width": 2,
      "circle-color": "green",
    },
    filter: ["==", "target_group_name", "NICKEL"],
  });
  map.on("idle", () => {
    // If these four layers were not added to the map, abort
    if (
      !map.getLayer("gold") ||
      !map.getLayer("bauxite") ||
      !map.getLayer("iron") ||
      !map.getLayer("nickel")
    ) {
      return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ["gold", "bauxite", "iron", "nickel"];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
      // Skip layers that already have a button set up.
      if (document.getElementById(id)) {
        continue;
      }

      // Create a link.
      const link = document.createElement("a");
      link.id = id;
      link.href = "#";
      link.textContent = id;
      link.className = "active";

      // Show or hide layer when the toggle is clicked.
      link.onclick = function (e) {
        const clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        const visibility = map.getLayoutProperty(clickedLayer, "visibility");

        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === "visible") {
          map.setLayoutProperty(clickedLayer, "visibility", "none");
          this.className = "";
        } else {
          this.className = "active";
          map.setLayoutProperty(clickedLayer, "visibility", "visible");
        }
      };

      const layers = document.getElementById("menu");
      layers.appendChild(link);
    }
  });
  map.on("click", "mines", (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.short_title;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "mines", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "mines", () => {
    map.getCanvas().style.cursor = "";
  });
});
