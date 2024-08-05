const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIkey = 'ce1edb3f8e276006163caf7a5a13001e';
    const city = document.querySelector('.search-box input').value;


    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=matric&appid=${APIkey}`)
    .then(response => response.json()).then(json => {

        const Image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                Image.src = 'images/clear.png';
                break;
            
            case 'Rain':
                Image.src = 'images/rain.png';
                break;

            case 'Snow':
                Image.src = 'images/snow.png';
                break;
            
            case 'Clouds':
                Image.src = 'images/cloud.png';
                break;

            case 'Mist':
                Image.src = 'images/mist.png';
                break;

            case 'Haze':
                Image.src = 'images/mist.png';
                break;
        
            default:
                Image.src = 'images/cloud.png';
        }

    });


});