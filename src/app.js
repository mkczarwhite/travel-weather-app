function formatDate (timestamp){
    let date=new Date(timestamp);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

}

function formatDay(timestamp){
    let date= new Date(timestamp*1000);
    let day=date.getDay();
    let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];

}

function displayForecast(response){
let forecast=response.data.daily;
let forecastElement=document.querySelector("#forecast");
let forecastHTML=`<div class="row">`;
forecast.forEach(function(forecastDay, index){
    if (index < 6){
      forecastHTML= forecastHTML + `
    <div class="col-sm-2">
       <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
        alt="" />
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}º</span> / <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}º</span>
    </div>`;  
    };

});

forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML= forecastHTML;

}
function getForecast(coordinates){
    let apiKey="d3c980000de9297354460be9460728c9";
    let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    let temperatureElement=document.querySelector("#current-temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let windSpeed=document.querySelector("#speed");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    let humidityElement=document.querySelector("#humidity");
    fahrenheitTemperature=response.data.main.temp;

    humidityElement.innerHTML=Math.round(response.data.main.humidity); 
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    windSpeed.innerHTML=Math.round(response.data.wind.speed);
    descriptionElement.innerHTML=response.data.weather[0].description;
    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
    getForecast(response.data.coord);
}
function lookUp(city){
        let apiKey="d3c980000de9297354460be9460728c9";
        let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
}

function search(event){
    event.preventDefault();
    let citySearchElement=document.querySelector("#city-input");
    lookUp(citySearchElement.value);
}

let form=document.querySelector("#search-form");
form.addEventListener("submit", search);

lookUp("Madison");