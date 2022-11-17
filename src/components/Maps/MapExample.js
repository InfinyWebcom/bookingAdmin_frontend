import React,{useState} from "react";

function MapExample(props) {
  const mapRef = React.useRef(null);
  console.log("lllllllllll",props.location)
  React.useEffect(() => {
    let markers=[]
    let google = window.google;
    let map = mapRef.current;
    let lat = props.location?props.location.latitude:"40.748817";
    let lng =props.location?props.location.longitude: "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    console.log("Ddddddddddddddddd",map);
    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: true,
      zoomControl: false,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#4299e1" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Notus React!",
    });
    const contentString =
      '<div class="info-window-content"><h2>Notus React</h2>' +
      "<p>A free Admin for Tailwind CSS, React, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      for (let i = 0; i < markers.length; i++) {  
      infowindow.open(map, markers[i]);}
      
    });
    google.maps.event.addListener(map, 'click', function(event) {
      marker.setMap(null);
      deleteMarkers()
      placeMarker(event.latLng)
      });
    function placeMarker(location) {      

      var marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
      });
      markers.push(marker)
      var x=location.lat();
      var y =location.lng()
      // map.setCenter(new google.maps.LatLng(x, y));
    
     props.setLocation({"latitude":x,"longitude":y})
    for (let i = 0; i < markers.length; i++) {  
     console.log("location",props.location)
      var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + markers[i].position.lat() +
        '<br>Longitude: ' + markers[i].position.lng()
      });
      infowindow.open(map,markers[i]);}
         }
         function clearMarkers() {
          for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);  //markerToBeRemoved.setMap(null);
          }
      }
      function deleteMarkers() {
        clearMarkers();
        markers = [];
    }
  },[]);
  return (
  
    <>
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full" ref={mapRef} />
      </div>
    </>
  );
}

export default MapExample;
