import cities from "./cities.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY3Jpc3RpYW50cnVqaWxsbyIsImEiOiJja29iNnRhNncyd3ZrMndscDNueG91cXZoIn0.3MuxWlOJI8rW1g-8mgb4yA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [100, 10],
  zoom: 3.5,
});

map.on("load", () => {
  map.addSource("cities", {
    type: "geojson",
    data: cities,
  });

  const color = (opacity) => [
    "case",
    ["==", ["get", "Cut"], 1000],
    `hsla(0, 100%, 50%, ${opacity}%)`,
    ["==", ["get", "Cut"], 5000],
    `hsla(60, 100%, 50%, ${opacity}%)`,
    ["==", ["get", "Cut"], 10000],
    `hsla(120, 100%, 50%, ${opacity}%)`,
    ["==", ["get", "Cut"], 20000],
    `hsla(180, 100%, 50%, ${opacity}%)`,
    ["==", ["get", "Cut"], 50000],
    `hsla(240, 100%, 50%, ${opacity}%)`,
    `hsla(240, 100%, 50%, ${opacity}%)`,
  ];

  map.addLayer({
    id: "cities",
    type: "fill",
    source: "cities",
    paint: {
      "fill-color": color(10),
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 5, 0.6, 13, 0.2],
    },
  });
  map.addLayer({
    id: "cities_line",
    type: "line",
    source: "cities",
    paint: {
      "line-color": color(100),
      "line-width": 2,
    },
  });
  map.addLayer({
    id: "cities_text",
    type: "symbol",
    source: "cities",
    layout: {
      "text-field": "Cutoff:{Cut}\nArea:{Area}",
      "text-size": 10,
    },
    paint: {
      "text-halo-width": 3,
      "text-halo-color": "#fff",
      "text-halo-blur": 3,
      "text-color": "#000",
    },
  });
});
