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

function displayTemperature(response){
    let temperatureElement=document.querySelector("#current-temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let windSpeed=document.querySelector("#speed");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    
    fahrenheitTemperature=response.data.main.temp;

    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    windSpeed.innerHTML=Math.round(response.data.wind.speed);
    descriptionElement.innerHTML=response.data.weather[0].description;
    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
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

function showCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#current-temperature");
    let celsiusTemperature=((fahrenheitTemperature - 32) * 5/9 );
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

function showFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("current-temperature");
    temperatureElement.innerHTML=fahrenheitTemperature;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}
let fahrenheitTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);



lookUp("Madison");