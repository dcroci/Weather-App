const card = document.querySelector('.card');
const img = document.querySelector('.bottoms-img');
const cityName = document.querySelector('.city-name');
const currentTemp = document.querySelector('.current-temp');
const bottomsText = document.querySelector('.bottoms-text');
const cityInput = document.querySelector('#city');
const btn = document.querySelector('button');
const umbrellaCard = document.querySelector('.umbrella');
const umbrellaQ = document.querySelector('.umbrella-q');
const weatherCondition = document.querySelector('.weather-cond');
const umbrellaImg = document.querySelector('.umbrella-img');
const weatherDesc = document.querySelector('.weather-desc');
const sunnyConditions = ['Sunny', 'Clear', 'Partly cloudy'];
let cityValue = '';
const apiKey = '3da167d533614b87a29175633230608';
let apiData;
const updateCards = (data) => {
  if (card.classList.contains('hidden')) {
    card.classList.remove('hidden');
  }
  cityName.textContent = `${data.location.name}, ${data.location.region} `;
  currentTemp.textContent = `${data.current.temp_f} Degrees F°`;
  if (data.current.temp_f > 80) {
    img.src = 'shorts.png';
    bottomsText.textContent = 'You should wear shorts today!';
  } else {
    img.src = 'pants.png';
    bottomsText.textContent = 'It is definitely a pants day!';
  }

  weatherCondition.textContent = `It is currently ${data.current.condition.text} outside!`;
  umbrellaImg.src = `${data.current.condition.icon}`;
  for (let i = 0; i < sunnyConditions.length; i++) {
    if (data.current.condition.text === sunnyConditions[i]) {
      weatherDesc.textContent =
        'Only bring an umbrella if you plan on blocking the sun!';
      break;
    } else {
      weatherDesc.textContent = 'An umbrella might be a good idea!';
    }
  }
};
const resetInput = () => {
  cityInput.value = '';
};

const fetchData = (cityValue) => {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityValue}&aqi=yes`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      apiData = data;
      updateCards(apiData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  cityValue = cityInput.value;
  fetchData(cityValue);
  resetInput();
});

umbrellaQ.addEventListener('click', () => {
  if (umbrellaCard.classList.contains('hidden')) {
    umbrellaCard.classList.remove('hidden');
  }
});
