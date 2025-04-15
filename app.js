// api configuration
 const apiKey = '9ea20e3a5401587ba412436de3892dbc';

 //dom elements
 const searchBtn = document.getElementById('search-btn');
 const cityInput = document.getElementById('city-input');
 const errorMsg = document.getElementById('error-msg');

 //weather display
 const tempElement = document.querySelector('.temp')
 const descriptionElement = document.querySelector('.description');
 const humidityElement = document.querySelector('#humidity.value');
 const windElement = document.querySelector('#wind.value');
 const precipitationElement = document.querySelector('#precipitaion.value');
 const locationElement = document.querySelector('.location');
 const dateDayName = document.querySelector('.date-dayname');
 const dateDay = document.querySelector('.date-day');
 const weatherIcon = document.querySelector('.waether-icon');

 // show default city
 window.addEventListener('load', () =>{
    getWeatherData('Accra');
 });

 //handle enter key press
cityInput.addEventListener('keypress',(e) =>
{
    if(e.key == 'Enter'){
        const city =cityInput.value.trim();
        if(city) getWeatherData(city);
    }
});


//fetch weather data from API
async function getWeatherData(city) {
try {
    const response = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if(!response.ok) throw new Error('city not found');
    const data = await response.json();
    updateWeatherUI(data);
} catch (error) {
    showError(error.message);
}
}

//click event to search for city
searchBtn.addEventListener('click',() =>{
    const city = cityInput.value.trim();
    if(city) getWeatherData(city);
} );


//update weather UI
function updateWeatherUI(data){
    const {name,sys,main,weather,wind,rain}= data;
    tempElement.textContent=`${Math.round(main.temp)}°C`;
    descriptionElement.textContent=weather[0].description;
    locationElement.textContent =`${name}, ${sys.country}`;

    //update weather UI details
    
}