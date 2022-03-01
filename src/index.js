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

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "8fe09840c8f6529695672e7366eacd10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let changeButton = document.querySelector("form");
changeButton.addEventListener("submit", changeCity);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#tValue");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let conditionElement = document.querySelector("#cond");
  conditionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humid");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let weatherIcon = document.querySelector("#picture");
  weatherIcon.innerHTML = response.data.weather.icon;
}

function toggleF(event) {
  event.preventDefault();
  let tempInfo = document.querySelector("#tValue");
  let farTemp = (tempInfo.innerHTML * 9) / 5 + 32;
  tempInfo.innerHTML = Math.round(farTemp);
}
let farChange = document.querySelector("#far");
farChange.addEventListener("click", toggleF);

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
