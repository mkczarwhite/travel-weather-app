function displayTemperature(response){
    console.log(response.data);
    let temperatureElement=document.querySelector("#current-temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let windSpeed=document.querySelector("#speed");
    windSpeed.innerHTML=Math.round(response.data.wind.speed);
    descriptionElement.innerHTML=response.data.weather[0].description;
    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
}
let apiKey="d3c980000de9297354460be9460728c9";
let city="New York";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);