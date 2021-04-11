function displayTemperature(response){
    console.log(response.data);
}
let apiKey="d3c980000de9297354460be9460728c9";
let city="New York";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);