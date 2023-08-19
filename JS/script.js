const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorMassage = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "5d4e08d7832fa12fe2c55cc7bd52aeb4";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&
  units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        errorMassage.style.display = "block";
        errorMassage.classList.add("fadeIn");
        return;
      }
      errorMassage.style.display = "none";
      errorMassage.classList.remove("fadeIn");

      const image  = document.querySelector('.weather-box img');
      const temperature  = document.querySelector('.weather-box .temperature');
      const description  = document.querySelector('.weather-box .description');
      const humidity  = document.querySelector('.weather-details .humidity span');
      const wind  = document.querySelector('.weather-details .wind span');

      switch(json.weather[0].main){
        case 'Clear':
        image.src = './IMG/sun.png';
        break;

        case 'Rain':
        image.src = './IMG/rain.png';
        break;

        case 'Snow':
        image.src = './IMG/snow.png';
        break;

        case 'Clouds':
        image.src = './IMG/cloudy.png';
        break;

        case 'Haze':
        image.src = './IMG/mist.png';
        break;

        default:
          image.src = '';
      }

      temperature.textContent = `${parseInt(json.main.temp - 273.15)}°C`;
      description.textContent = `${json.weather[0].description}`;
      humidity.textContent = `${json.main.humidity}%`;
      wind.textContent = `${json.wind.speed}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px'
    });
});
