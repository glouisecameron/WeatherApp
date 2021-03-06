let currentDate = new Date();

let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentDate.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentDate.getDay()];

let timeInfo = document.querySelector(".time-info");

timeInfo.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  response.data.daily.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
      <div class "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="40"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8fe09840c8f6529695672e7366eacd10";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "8fe09840c8f6529695672e7366eacd10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Glasgow");


let changeButton = document.querySelector("form");
changeButton.addEventListener("submit", changeCity);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#tValue");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#cond");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#picture");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);

  cityElement.innerHTML = response.data.name;

  conditionElement.innerHTML = response.data.weather[0].description;

  humidityElement.innerHTML = response.data.main.humidity;

  windElement.innerHTML = Math.round(response.data.wind.speed);

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
  celciusTemperature = response.data.main.temp;

}

let celciusTemperature = null;
function toggleF(event) {
  event.preventDefault();
  celsChange.classList.remove("active");
  farChange.classList.add("active");
  let tempInfo = document.querySelector("#tValue");
  let farTemp = (celciusTemperature * 9) / 5 + 32;
  tempInfo.innerHTML = Math.round(farTemp);
}
let farChange = document.querySelector("#far");
farChange.addEventListener("click", toggleF);

function toggleC(event) {
  event.preventDefault();
  farChange.classList.remove("active");
  celsChange.classList.add("active");
  let temperInfo = document.querySelector("#tValue");
  temperInfo.innerHTML = Math.round(celciusTemperature);
}
let celsChange = document.querySelector("#cels");
celsChange.addEventListener("click", toggleC);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8fe09840c8f6529695672e7366eacd10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let homeButton = document.querySelector("#curLoc");
homeButton.addEventListener("click", getLocation);