function searchCity(event) {
  formatDateTime();
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  if (searchInput.value) {
    searchCityWeather(searchInput.value);
  } else {
    let cityDisplay = document.querySelector("#city-display");
    cityDisplay.innerHTML = null;
    alert("Search for a city.");
  }
}

function showTemp(response) {
  let cityDisplay = document.querySelector("#city-display");
  cityDisplay.innerHTML = response.data.name;
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  let sourcedTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  let weatherDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let actualWindSpeed = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;

  celsiusTemp = response.data.main.temp;
  temp.innerHTML = ` ${sourcedTemp}°C`;
  celsius.innerHTML = `°C |`;
  fahrenheit.innerHTML = ` °F`;
  weatherDescription.innerHTML = `${response.data.weather[0].description} `;
  windSpeed.innerHTML = `| Wind Speed: ${actualWindSpeed}m/s`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
}

function searchCityWeather(cityName) {
  let apiKey = "8f74c72399c350e75af3f25df3b5a966";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`)
    .then(showTemp);
}

// function showPosition(position) {
//   let cityDisplay = document.querySelector("cityDisplay");
//   cityDisplay.innerHTML = `Your Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}.`;
// }

// function getCurrentLocation() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// let myLocationBtn = document.querySelector("button");
// GamepadButton.addEventListener("click", getCurrentPosition);

function formatDateTime(timestamp) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours === 12) {
    time = `${hours}:${minutes}pm`;
  } else if (hours > 12) {
    time = `${hours - 12}:${minutes}pm`;
  } else {
    time = `${hours}:${minutes}am`;
  }

  let currentDateTime = document.querySelector("#current-date-time");
  currentDateTime.innerHTML = `As of ${day}, ${month} ${date} at ${time}`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML = ` ${Math.round(fahrenheitTemp)}°F`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temp.innerHTML = ` ${Math.round(celsiusTemp)}°C`;
}

function dispalyForecast() {
  let forecast = document.querySelector("#weather-forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weatherForecastDate">${day}</div>
        <img 
        src="http://openweathermap.org/img/wn/01d@2x.png" 
        alt="" 
        width="42"
      />
      <div class="weatherForecastTemp">
        <span class="weatherForecastTempMax">20°</span>
        <span class="weatherForecastTempMin">16°</span>
      </div>
      </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

dispalyForecast();
