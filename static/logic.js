// CREATE MAP
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/rhockley82/cl9mtn0nf000814o7v7n28efm", // style URL
  center: [121.6, -24.4], // starting position [lng, lat]
  zoom: 3.6, // starting zoom
  projection: "globe",
});

// DATA SOURCE
map.on("load", () => {
  map.addSource("mines", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/ParkaviMathi/Project_3/main/static/clean_mines.geojson",
  });

// LAYERS
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

  // MENU
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
  // POPUPS
  map.on("click", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["gold", "nickel", "iron", "bauxite"], // replace this with the name of the layer
    });

    if (!features.length) {
      return;
    }

    var feature = features[0];

    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
        "<strong>" +
          feature.properties.short_title +
          "</strong><p>" +
          feature.properties.target_group_name +
          "</p><p>" +
          feature.properties.stage +
          "</p>"
      ) // CHANGE THIS TO REFLECT THE PROPERTIES YOU WANT TO SHOW
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
  });

  // CHANGE CURSOR
  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", ["gold", "nickel", "iron", "bauxite"], function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", ["gold", "nickel", "iron", "bauxite"], function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
