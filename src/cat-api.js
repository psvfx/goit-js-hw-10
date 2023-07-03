'use strict';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_uz8FWkfAyYCXJquFtv9gwR5mDmKyNRB2YuHKWZLsmh6jeWpxldlYjvSkN8ID2zSi';

// Функція для завантаження колекуції порід:
export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(url)
    .then(resonse => resonse.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

// Перевірка отмимання промісум колекції:
console.log(fetchBreeds());

// Функція для отримання інформації про кота за породою:
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
