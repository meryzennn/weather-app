const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide'); // Corrected class name

search.addEventListener('click', () => {
    const APIkey = '8a25db6d165a0764ec51a806b2e4d514';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            if (cityHide.textContent == city) {
                return;
            } else {
                cityHide.textContent = city;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity .text span');
            const wind = document.querySelector('.weather-details .wind .text span');

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active'); // Remove the 'active' class from error404

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.webp';
                    break;
                case 'Rain':
                    image.src = 'images/rain.webp';
                    break;
                case 'Snow':
                    image.src = 'images/snow.webp';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.webp';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'images/mist.webp';
                    break;
                default:
                    image.src = 'images/cloud.webp';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        })
        .catch(error => {
            console.error('Error:', error);
        });

});
