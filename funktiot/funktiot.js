const apiKey = 'd4f1b4c7f2afbea2f7c9a975b462ebbf'; 
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=d4f1b4c7f2afbea2f7c9a975b462ebbf&units=metric'; 
const icon_url = 'https://openweathermap.org/img/wn/'; 

const location_span = document.querySelector('#location');
const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_img = document.querySelector('img');

const getWeather = (lat, lon) => {

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Verkkopyyntö epäonnistui: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            location_span.innerHTML = `${data.name}, ${data.sys.country}`; 
            temp_span.innerHTML = `${data.main.temp} °C`; 
            speed_span.innerHTML = `${data.wind.speed} m/s`;
            direction_span.innerHTML = `${data.wind.deg}°`; 
            description_span.innerHTML = data.weather[0].description;
            icon_img.src = `${icon_url}${data.weather[0].icon}@2x.png`; 
        })
        .catch(error => console.error('Virhe säätietojen haussa:', error));
};

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeather(position.coords.latitude, position.coords.longitude);
        }, error => {
            alert('Sijainnin hakeminen epäonnistui: ' + error.message);
        });
    } else {
        alert("Selaimesi ei tue geolokaatiota!");
    }
};

getLocation();