const card = document.querySelector('.card');
const img = document.querySelector('img');
const cityName = document.querySelector('.city-name');
const currentTemp = document.querySelector('.current-temp');
const bottomsText = document.querySelector('.bottoms-text');
const cityInput = document.querySelector('#city');
const btn = document.querySelector('button');
let cityValue = '';
const apiKey = '3da167d533614b87a29175633230608';
let apiData = {};
const updateCard = (data) => {
  if (card.classList.contains('hidden')) {
    card.classList.remove('hidden');
  }
  cityName.textContent = `${data.location.name}, ${data.location.region} `;
  currentTemp.textContent = `${data.current.temp_f} Degrees F°`;
  if (data.current.temp_f > 90) {
    img.src = 'shorts.png';
    bottomsText.textContent = 'You should wear shorts today!';
  } else {
    img.src = 'pants.png';
    bottomsText.textContent = 'It is definitely a pants day!';
  }
};
const resetInput = () => {
  cityInput.value = '';
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  cityValue = cityInput.value;
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
      updateCard(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  resetInput();
});
