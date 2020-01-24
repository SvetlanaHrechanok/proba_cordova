let keyAPI = 'ed7afbd9f14720fe993fef2f143831b5';

let onWeatherSuccess = function (position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

let onWeatherWatchSuccess = function (position) {

    let updatedLatitude = position.coords.latitude;
    let updatedLongitude = position.coords.longitude;

    if (updatedLatitude != latitude && updatedLongitude != longitude) {

        latitude = updatedLatitude;
        longitude = updatedLongitude;

        // Calls function we defined earlier.
        getWeather(updatedLatitude, updatedLongitude);
    }
}

function getWeather(latitude, longitude) {

    let queryString = 'http://api.openweathermap.org/data/2.5/weather?lat='
        + latitude + '&lon=' + longitude + '&appid=' + keyAPI + '&units=metric';

    // $.ajax({
    //     url: queryString,
    //     type: 'GET',
    //     dataType: 'json',
    //     origin: '*',
    //     success: function (results) {
    //         getResultForWeather(results)
    //     },
    //     error: function () {
    //         document.getElementById('message').innerText = 'Error getting location';
    //         document.getElementById('main').style.display = 'none';
    //     }
    // });

    getBodyWeather(queryString)
        .then((body) => {
            getResultForWeather(body);
        })
        .catch((err) => {
            document.getElementById('message').innerText = 'Error getting location ' + err;
            document.getElementById('main').style.display = 'none';
        });

}

let searchCityWeather = document.getElementById('searchCityWeather');
searchCityWeather.addEventListener('click', () => {
    let inputCity = document.getElementById('inputCity');
    console.log(inputCity.value);
    getWeatherCity(inputCity.value);
});

let inputCity = document.getElementById('inputCity');
inputCity.addEventListener('keydown', (event) => {
    if(event.keyCode == 13) {
        console.log(inputCity.value);
        getWeatherCity(inputCity.value);
    }
});

function getWeatherCity(nameCity) {

    let queryString = 'http://api.openweathermap.org/data/2.5/weather?q='+ nameCity +'&appid=' + keyAPI + '&units=metric';

    // $.ajax({
    //     url: queryString,
    //     type:"GET",
    //     dataType: "json",
    //     origin: '*',
    //     success: function (results) {
    //         getResultForWeather(results)
    //     },
    //     error: function () {
    //         document.getElementById('message').innerText = 'City is not founded';
    //         document.getElementById('main').style.display = 'none';
    //     }
    // });

    getBodyWeather(queryString)
        .then((body) => {
            getResultForWeather(body);
        })
        .catch((err) => {
            console.log(document.getElementById('message'));
            document.getElementById('message').classList.remove('hidden');
            document.getElementById('message').innerHTML = 'City is not founded ' + err;
            document.getElementById('main').style.display = 'none';
            console.log(err);
        });
}

function onWeatherError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

const getBodyWeather = async (url) => {
    const res = await fetch(url);
    console.log(res);
    if(!res.ok) {
        throw new Error(`Sorry! Error.`);
    }
    const body = await res.json();
    console.log(body);
    return body;
};

function getResultForWeather(results) {
    console.log(results);
    if(results){
        document.getElementById('main').style.display = 'block';
        document.getElementById('message').classList.add('hidden');
        document.getElementById('nameCity').innerText = results.name;
        if (results.weather.length) {
            document.getElementById('description').innerHTML = results.weather[0].description;
            let img = document.getElementById('imgId');
            img.src = 'http://openweathermap.org/img/w/' + results.weather[0].icon + '.png';
        }
        if (results.main) {
            document.getElementById('temp').innerHTML = Math.round(results.main.temp) + '°C';
            document.getElementById('humidity').innerHTML = Math.round(results.main.humidity) + '%';
        }
        if(results.wind) {
            document.getElementById('wind').innerHTML = Math.round(results.wind.speed) + 'm/s';
        }
    }
}
