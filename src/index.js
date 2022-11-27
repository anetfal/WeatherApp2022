let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
let dayNames = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday'
];

function setDateTime() {
   let now = new Date();
   let datetimeElement = document.getElementById('datetime');
   datetimeElement.innerHTML = `${dayNames[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
}

function setWeatherFromApiResponse(response) {
   let h2 = document.querySelector('h2');
   h2.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}

function onFormSubmit(event) {
   let cityField = document.getElementById('city');
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityField.value}&appid=${apiKey}&units=metric`;

   let h1 = document.querySelector('h1');
   h1.innerHTML = cityField.value;
   cityField.value = '';

   axios.get(apiUrl).then(setWeatherFromApiResponse);
   event.preventDefault();
}

function setWeatherFromPosition(position) {
   let lat = position.coords.latitude;
   let long = position.coords.longitude;

   let h1 = document.querySelector('h1');
   h1.innerHTML = 'Your Location';

   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(setWeatherFromApiResponse);
}

function currentLocationOnClick() {
   navigator.geolocation.getCurrentPosition(setWeatherFromPosition);
}

setDateTime();
let form = document.querySelector('form');
form.addEventListener('submit', onFormSubmit);

let currentLocationButton = document.querySelector('#current-location');
currentLocationButton.addEventListener('click', currentLocationOnClick);