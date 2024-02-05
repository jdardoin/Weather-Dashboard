function getWeather() {
  var cityName = document.getElementById("city").value;
  var apiKey = "bffc80ac541dc228eed611b695845020";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data and update the HTML
      displayWeather(data);

      // Display 5-day forecast
      displayForecast(cityName);

    
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(weatherData) {
  var cityName = weatherData.name;
  var date = new Date().toLocaleDateString();
  var icon = weatherData.weather[0].icon;
  var temperature = weatherData.main.temp;
  var humidity = weatherData.main.humidity;
  var windSpeed = weatherData.wind.speed;

  var currentWeather = document.getElementById("current");
  currentWeather.innerHTML = `
        <h3>Current Weather in ${cityName}</h3>
        <p>Date: ${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} K</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

function displayForecast(cityName) {
  var apiKey = "bffc80ac541dc228eed611b695845020";
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract relevant information from the API response
      var forecastData = data.list;

      // Display 5-day forecast
      var forecastContainer = document.getElementById("future-forecast");
      forecastContainer.innerHTML = "<h3>5-Day Forecast</h3>";

      for (var i = 0; i < forecastData.length; i += 8) {
        var forecastDate = new Date(
          forecastData[i].dt * 1000
        ).toLocaleDateString();
        var forecastIcon = forecastData[i].weather[0].icon;
        var forecastTemperature = forecastData[i].main.temp;
        var forecastHumidity = forecastData[i].main.humidity;
        var forecastWindSpeed = forecastData[i].wind.speed;

        var forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        forecastItem.innerHTML = `
            <p>Date: ${forecastDate}</p>
            <img src="https://openweathermap.org/img/wn/${forecastIcon}.png" alt="Weather Icon">
            <p>Temperature: ${forecastTemperature} K</p>
            <p>Humidity: ${forecastHumidity}%</p>
            <p>Wind Speed: ${forecastWindSpeed} m/s</p>
          `;

        forecastContainer.appendChild(forecastItem);
      }
    })
    .catch((error) => console.error("Error fetching forecast data:", error));
}

