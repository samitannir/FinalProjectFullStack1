const key = 'c6b4fda6b9eb2f8d07bc39ae91b64966';
if(key==''){
    document.getElementById('temp').innerHTML = ('Remember to add your api key!');
}

function weatherBallon( cityID ) {
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            drawWeather(data);
            tableInfo(data);
        })
        .catch(function() {
            // catch any errors
        });
}

function drawWeather( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    var description = d.weather[0].description;

    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;

    if( description.indexOf('rain') > 0 ) {
        document.body.className = 'rainy';
    } else if( description.indexOf('cloud') > 0 ) {
        document.body.className = 'cloudy';
    } else if( description.indexOf('sunny') > 0 ) {
        document.body.className = 'sunny';
    } else {
        document.body.className = 'clear';
    }
}

function tableInfo(d){
    document.getElementById('wind').innerHTML = d.wind.speed + " m/s";
    document.getElementById('cloudiness').innerHTML = d.weather[0].description;
    document.getElementById('pressure').innerHTML = d.main.pressure + " hpa";
    document.getElementById('humidity').innerHTML = d.main.humidity + " %";
    document.getElementById('sunrise').innerHTML = d.sys.sunset;
    document.getElementById('sunset').innerHTML = d.sys.sunset;
    document.getElementById('coords').innerHTML = "[" + d.coord.lat + " , " + d.coord.lon + "]";
}

function showDate(){
    var date = new Date();
    var dateFull = date.getFullYear();
    document.getElementById("showDate").innerHTML = dateFull;
}

function cities(){
    var x = document.getElementById("locality-dropdown").value;
    weatherBallon(x);
}

function selectBox(){
  let dropdown = document.getElementById('locality-dropdown');
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
    defaultOption.text = 'Select the city';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const url = 'https://api.myjson.com/bins/1ax6rl';

  fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.warn('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          let option;

      	for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
        	  option.text = data[i].name;
            option.value = data[i].id;
        	  dropdown.add(option);
      	}
        });
      }
    )
    .catch(function(err) {
      console.error('Fetch Error -', err);
    });
}


window.onload = function() {
    weatherBallon( 6167865 );
    showDate();
    selectBox();
};





// sources
// https://bytemaster.io/fetch-weather-openweathermap-api-javascript
// https://openweathermap.org
