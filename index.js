const app = document.querySelector('.main');
const API_KEY = `2ed89b435147ade82b842fc9c021c9ac`;
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const inputLocation = document.querySelector('.location');
const condition = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const form = document.getElementById('inputLocation');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

function whiteIcon(){
    document.getElementById("submit").src = "./assets/icons/search_white.svg";
}

function blackIcon(){
    document.getElementById("submit").src = "./assets/icons/search_black.svg";
}

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        getWeather();
        // app.style.opacity = "0";
    })
});

form.addEventListener('submit', (e) => {
    if(search.value.length == 0){
        alert('Please enter a city name');
    }
    else{
        cityInput = search.value;
        getWeather();
        search.value = "";
        // app.style.opacity = "0";
    }
    e.preventDefault();
});

function getWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            temp.innerHTML = Math.round(data.main.temp) + "&#176";
            condition.innerHTML = data.weather[0].main;

            inputLocation.innerHTML = data.name;

            d = new Date()
            localTime = d.getTime()
            localOffset = d.getTimezoneOffset() * 60000
            utc = localTime + localOffset
            var timezone = utc + (1000 * data.timezone)
            nd = new Date(timezone)

            let hh = nd.getHours();
            let mm = nd.getMinutes();
            hh = (hh < 10) ? "0" + hh : hh;
            mm = (mm < 10) ? "0" + mm : mm;
            timeOutput.innerHTML = hh + ":" + mm;

            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let day = weekday[d.getDay()];
            const months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
            let month = months[d.getMonth()];
            let date = d.getDate();
            dateOutput.innerHTML = day+" "+month+" "+date;

            document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            cloud.innerHTML = data.clouds.all + "%";
            humidity.innerHTML = data.main.humidity + "%";
            wind.innerHTML = data.wind.speed + "km/h";

            let timeOfDay = "day";
            const code = data.weather[0].id;

            const day_night = data.weather[0].icon;

            if(day_night[2] != "d"){
                timeOfDay = "night";
            }
            
            if(code == 800){
                app.style.backgroundImage = `url(./assets/images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#4798d5";
                if(timeOfDay == "night"){
                    btn.style.background = "#323a70";
                }
            }
            else if(code == 801 || code == 802 || code == 803 || code == 804){
                app.style.backgroundImage = `url(./assets/images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if(timeOfDay == "night"){
                    btn.style.background = "#496980";
                }
            }

        })
}

// app.style.opacity = "1";
getWeather();