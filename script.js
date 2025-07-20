import { apiKey, apiUrl} from "./config.js";

const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const weatherIconImg = document.querySelector(".weather-icon-img");
const temperatureEl = document.querySelector(".temperature");
const cityNameEl = document.querySelector(".city-name");
const humidityEl = document.querySelector(".humidity-details span");
const windspeedEl = document.querySelector(".wind-speed-details span");

function getWeatherImg(cloudiness){
    if(cloudiness > 80){
        return "./assets/rain.webp";
        
    }
    else if(cloudiness > 30 ){
       return "./assets/clouds.png";
    }
    else {
        return "./assets/sunny.webp"
    }
}



async function getWeather(city){
    try{
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if(!response.ok) throw new Error("city not found")
         
        const data = await response.json();
        cityNameEl.textContent = data.name;;
        temperatureEl.textContent = `${Math.round(data.main.temp - 273)}°C`;
        windspeedEl.textContent = `${data.wind.speed} km/h`;
        humidityEl.textContent = `${data.main.humidity}%`;
        weatherIconImg.src = getWeatherImg(data.clouds.all);

        // console.log(data);
    }
    catch(e){
     alert("error");
    }
}

searchIcon.addEventListener("click",()=>{
    const city = searchInput.value.trim();
    if(city){
        getWeather(city);
    }
    else{
        alert("Enter valid city");
    }
});



getWeather("delhi");