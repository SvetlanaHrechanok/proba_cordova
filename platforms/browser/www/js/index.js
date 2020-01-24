// let myKey = "AIzaSyDSrY4NjZLv5hZ6xxG77NjHpKcxiaurTwY";
//
// function loadScript() {
//     let script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = "https://maps.googleapis.com/maps/api/js?key=" + myKey + "&callback=initMap";
//     document.body.appendChild(script);
// }

let app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        let map =  document.getElementById('mapbtn');
        let result = document.getElementById('result');
        let weather = document.getElementById('weatherbtn');
        let exchangerate = document.getElementById('exchangeratebtn');

        map.addEventListener('click', () => {
            document.getElementById('map').style.display = 'block';
            document.getElementById('weather').style.display = 'none';
            document.getElementById('exchangerate').style.display = 'none';

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
                let watchID = navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
                navigator.geolocation.clearWatch(watchID);
            }
            else {
                result.innerHTML = `Your browser does not support geolocation`;
            }
        });

        weather.addEventListener('click', () => {
            document.getElementById('weather').style.display = 'block';
            document.getElementById('map').style.display = 'none';
            document.getElementById('exchangerate').style.display = 'none';

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
                let watchID = navigator.geolocation.watchPosition(onWeatherWatchSuccess, onWeatherError, { enableHighAccuracy: true });
                navigator.geolocation.clearWatch(watchID);
            }
            else {
                result.innerHTML = `Your browser does not support geolocation`;
            }
        });

        exchangerate.addEventListener('click', () => {
            console.log('EXCANGE');
            document.getElementById('weather').style.display = 'none';
            document.getElementById('map').style.display = 'none';
            document.getElementById('exchangerate').style.display = 'block';
        });
    }
};
app.initialize();
//loadScript();
