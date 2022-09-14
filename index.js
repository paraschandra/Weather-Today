const app = document.querySelector('.main');
const temp = document.querySelector('.temp');
const s = "ed";
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const inputLocation = document.querySelector('.location');
const condition = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const feelsLike = document.querySelector('.feels-like');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const form = document.getElementById('inputLocation');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const API_KEY = `fcf5bdd2944a344a1${s}3a8d3b1c11fd1`;

function whiteIcon(){
    document.getElementById("submit").src = "./assets/icons/search_white.svg";
}

function blackIcon(){
    document.getElementById("submit").src = "./assets/icons/search_black.svg";
}

let cityInput = "New Delhi";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        getWeather();
        app.style.opacity = "0";
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
        app.style.opacity = "0";
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

            feelsLike.innerHTML = Math.round(data.main.feels_like) + "&#176";
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
            else if(code == 801 || code == 802 || code == 803 || code == 804 || code == 781){
                app.style.backgroundImage = `url(./assets/images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if(timeOfDay == "night"){
                    btn.style.background = "#162739";
                }
            }
            else if(code == 200 || code == 201 || code == 202 || code == 210 || code == 211 || code == 212 || code == 221 || code == 230 || code == 231 || code == 232 || code == 300 || code == 301 || code == 302 || code == 310 || code == 311 || code == 312 || code == 313 || code == 314 || code == 321 || code == 500 || code == 501 || code == 502 || code == 503 || code == 504 || code == 511 || code == 520 || code == 521 || code == 522 || code == 531){
                app.style.backgroundImage = `url(./assets/images/${timeOfDay}/rain.jpg)`;
                btn.style.background = "#829f9a";
                if(timeOfDay == "night"){
                    btn.style.background = "#182f43";
                }
            }
            else if(code == 701 || code == 711 || code == 721 || code == 731 || code == 741 || code == 751 || code == 761 || code == 762 || code == 771){
                app.style.backgroundImage = `url(./assets/images/${timeOfDay}/atmosphere.jpg)`;
                btn.style.background = "#3e4038";
                if(timeOfDay == "night"){
                    btn.style.background = "#1d5f7b";
                }
            }
            else{
                app.style.backgroundImage = `url(./assets/images/${timeOfDay}/snow.jpg)`;
                btn.style.background = "#80b9cc";
                if(timeOfDay == "night"){
                    btn.style.background = "#838c95";
                }
            }
            app.style.opacity = "1";
        })

        .catch(() => {
            alert('City not found! Try again');
            app.style.opacity = "1";
        });
}
getWeather();

app.style.opacity = "1";