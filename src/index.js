let currentDate = new Date();

let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

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
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#tValue");
  tempElement.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${city}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humid");
  humidityElement.innerHTML = `${humidity}`;
  let windSpeed = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${windSpeed}`;
  let condition = response.data.weather[0].main;
  let weatherCondition = document.querySelector("#cond");
    weatherCondition.innerHTML = `${condition}`;
    
    let icon = response.data.weather.icon;
    let weatherIcon = document.querySelector("#picture");
    weatherIcon.innerHTML = `${icon}`;

}

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


