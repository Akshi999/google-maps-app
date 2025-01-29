let map, autocomplete, drawingManager, trafficLayer;

function initMap() {
  const center = { lat: -34.397, lng: 150.644 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: center,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#212121" }] },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] }
    ],
  });

  // Autocomplete for search bar
  const input = document.getElementById("autocomplete");
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      map.setCenter(place.geometry.location);
      map.setZoom(14);
      new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
      });
    }
  });

  // Drawing tools for interactive shapes
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    polygonOptions: {
      fillColor: "#FF0000",
      fillOpacity: 0.5,
      strokeWeight: 2,
    },
  });
  drawingManager.setMap(map);

  // Traffic Layer (Real-Time Data)
  trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

// Directions and Distance Matrix functions can be added here
