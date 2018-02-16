function weatherSubmit() {
  var city = document.getElementById("weatherForm").theCity.value;
  console.log(city);

  getWeather(city);
}

function getWeather(city) {
  var myURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=b29095ba1d3d0de51274438b9c3e5375";
  console.log(myURL);
  $.ajax({
    url: myURL,
    dataType: "json",
    success: function(json) {
      displayWeatherResults(json);
      console.log(json);
    },
    error: function(json) {
      failureMSG(json);
      console.log(json);
    }
  });
}

function failureMSG(json) {
  console.log(json.responseJSON);
  displayWeatherResults(json.responseJSON);
}

function displayWeatherResults(json) {
  if (json['cod'] === '404') {
    var results = "<h2>ERROR: " + json['message'] + "</h2>";
  }
  else {
    var results = "";
    results += '<h2>Weather in ' + json.name + ", " + json.sys.country + "</h2>";
    for (var i = 0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
    }
    results += '<h2>Current: ' + json.main.temp + " &deg;C</h2>";
    results += '<b>High:    ' + json.main.temp_max + " &deg;C</b> ||| ";
    results += '<b>Low:     ' + json.main.temp_min + " &deg;C</b>";
    results += '<div><b>Weather conditions:</b></div><div class="boxed">';
    for (var i = 0; i < json.weather.length; i++) {
      results += json.weather[i].description
      if (i !== json.weather.length - 1)
        results += ", ";
    }
    results += "</div>"
    results += '<div>Wind is currently blowing at ' + json.wind['deg'] + "&deg;</div>";
    results += '<div>Wind is currently blowing at ' + json.wind['speed'] + ' m/s</div>';
    results += '<div></div>'
    results += '<div>Humidity is at ' + json.main.humidity + '%</div>';
    results += '<div></div>'
    results += '<div>Pressure is at ' + json.main.pressure + " hPa</div>";
  }
  $("#weatherResults").html(results);
}

function overflowSubmit() {
  var request = document.getElementById('overflowForm').request.value;
  console.log(request);
  getOverflow(request);
}

function getOverflow(request) {
  var myURL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + request;
  console.log(myURL);
  $.ajax({
    url: myURL,
    dataType: "json",
    success: function(json) {
      displayOverflowResults(json);
      console.log(json);
    }
  });
}

function displayOverflowResults(json) {
  var results = "";
  results += "<h2>Stack overflow questions:</h2>";
  for (var i = 0;i < json.items.length;i++) {
    results += '<div><a href="' + json.items[i].link + '">' + json.items[i].title + '</a></div>';
  }

  $("#overflowResults").html(results);
}
