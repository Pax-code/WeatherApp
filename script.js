

const apiKey = "YOUR_API_KEY_IS_HERE";

const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    //setting API call
    const response = await fetch(URL + city + `&appid=${apiKey}`);
    var data = await response.json();

    //checking for textBox is empty or invalid
    if(response.status == 404 || searchBox.value == ""){

        //if status is ok and value is not empty we hiding the error message
        document.querySelector(".error").style.display = "block"

        //if status is not ok or value is empty we hiding the values
        document.querySelector(".weather").style.display = "none"

     }else{
        //if status is not ok or value is empty we showing the error message
        document.querySelector(".error").style.display = "none"

        //if status is ok and value is not empty then we show the all values
        document.querySelector(".weather").style.display = "block"
        
        //assigning the incoming data to the places where it will be displayed
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/s";
    

        //we adjust the weather icon according to the call returned from the API
        if(data.weather[0].main == "Clouds"){
           weatherIcon.src = "images/clouds.png";
         }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
         }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
         }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
         }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
         }else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/Snow.png";
         }
     }
}

//search button click listener
searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

//enter click listener
searchBox.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') {
        checkWeather(searchBox.value);
    }
});


