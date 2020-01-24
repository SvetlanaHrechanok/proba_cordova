
let map,
    latitude,
    longitude,
    result = document.getElementById('result');

let onMapSuccess = function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getMap(latitude, longitude);

}

let onMapError = function (error) {

    if(error.code == 1) {
        result.innerHTML = `You chose not to provide your location data, 
                    but that's not a problem. We will no longer request them from you.`;
    }
    else if(error.code == 2) {
        result.innerHTML = `Network problems or unable to contact the location service for any other reason.`;
    }
    else if(error.code == 3) {
        result.innerHTML = `He was able to locate the location within the set time.`;

    }
    else {
        result.innerHTML = `Mysterious mistake.`;
    }
    getMap(55.753878,37.649275);
}

let onMapWatchSuccess = function (position) {

    let updatedLatitude = position.coords.latitude;
    let updatedLongitude = position.coords.longitude;

    if (updatedLatitude != latitude && updatedLongitude != longitude) {

        latitude = updatedLatitude;
        longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

function getMap(latitude, longitude) {

    //for leaflet maps

    map = L.map('map').setView([latitude, longitude], 13);
    //map = L.map('map').fitWorld();

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 16,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoic3ZldGExOTg1IiwiYSI6ImNrNGN0eDB2bTA4d2kzZm8xN3RzNzlkN2EifQ.eA0pypHe8gt_o7aaYFKB8A'
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    let marker = L.marker([latitude, longitude]).addTo(map);

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);


    // for google maps

    // let mapOptions = {
    //     center: new google.maps.LatLng(0, 0),
    //     zoom: 1,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    //
    // map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //
    //
    // let latLong = new google.maps.LatLng(latitude, longitude);
    //
    // let marker = new google.maps.Marker({
    //     position: latLong
    // });
    //
    // marker.setMap(map);
    // map.setZoom(15);
    // map.setCenter(marker.getPosition());
}

function onLocationFound(e) {
    let radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here =)").openPopup();

   // L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    result.innerHTML = e.message;
}