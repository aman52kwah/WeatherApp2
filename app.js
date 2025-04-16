// api configuration
 const apiKey = '9ea20e3a5401587ba412436de3892dbc';

 //dom elements
 const searchBtn = document.getElementById('search-btn');
 const cityInput = document.getElementById('city-input');
 const errorMsg = document.getElementById('error-msg');

 //weather display
 const tempElement = document.querySelector('.temp');
 const descriptionElement = document.querySelector('.description');
 const humidityElement = document.querySelector('#humidity .value');
 const windElement = document.querySelector('#wind .value');
 const precipitationElement = document.querySelector('#precipitation .value');
 const locationElement = document.querySelector('.location');
 const dateDayName = document.querySelector('.date-dayname');
 const dateDay = document.querySelector('.date-day');
 const weatherIcon = document.querySelector('.weather-icon');

 // show default city
 window.addEventListener('load', () =>{
    getWeatherData('Accra');
 });

 //handle enter key press
cityInput.addEventListener('keypress',(e) =>
{
    if(e.key == 'Enter'){
        const city = cityInput.value.trim();
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
    errorMsg.classList.add('hidden');
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
   
   //update main weather
    tempElement.textContent=`${Math.round(main.temp)}°C`;
    descriptionElement.textContent= weather[0].description;
    locationElement.textContent =`${name}, ${sys.country}`;

    //update weather UI details
    humidityElement.textContent=`${main.humidity}%`;
    windElement.textContent =`${Math.round(wind.speed * 3.6)}km/h`;


    //precipitation if rain might not be available and fixed to mm
    const precipitation= rain ? rain['1h'] || 0 : 0;
    precipitationElement.textContent = `${precipitation} mm`;

    //update Date
    updateDate();

    // upate weather icon
    if (weatherIcon) {
        weatherIcon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${
        weather[0].description}">`;
    }
   
}
function updateWeatherIcon(weatherCondition){
    let iconName = 'sun'; //default

    const weatherMap ={
        'Clear':'sun',
        'Clouds':'cloud',
        'Rain':'cloud-rain',
        'Thunderstorm':'cloud-lightning',
        'Snow':'cloud-snow',
        'Mist':'cloud-drizzle'
    };
    if (weatherMap[weatherCondition]){
        iconName = weatherMap[weatherCondition]
    }

    if (typeof feather !== 'undefined'){
        weatherIcon.setAttribute('data-feather',iconName);
        feather.replace();
    }
}

function updateDate(){
    const now = new Date();
    const days =['Sunday','Monday','Tues','Wednesday',
        'Thursday','Friday','Saturday'
    ];
    const months = ['Jan','Feb','Mar','Apr','May','June','Jul',
        'Aug','Sep','Oct','Nov','Dec'
    ];

    dateDayName.textContent =days[now.getDay()];
    dateDay.textContent=`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

//show error message if city not found


function showError(message){
errorMsg.textContent= message;
errorMsg.classList.remove('hidden');
}