'use strict';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

// Отримання посилань на елементи DOM
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Показати елемент завантажувача
function showLoader() {
  loader.style.display = 'block';
}

// Приховати елемент завантажувача
function hideLoader() {
  loader.style.display = 'none';
}

// Показати елемент помилки
function showError() {
  error.style.display = 'block';
}

// Приховати елемент помилки
function hideError() {
  error.style.display = 'none';
}

// Очистка інформації про кота
function clearCatInfo() {
  catInfo.innerHTML = '';
}

// Оновлення інтерфейсу зображення та інформації про кота
function updateCatInfo(imageUrl, breedName, description, temperament) {
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;

  const breedNameElement = document.createElement('h2');
  breedNameElement.textContent = breedName;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;

  const temperamentElement = document.createElement('p');
  temperamentElement.textContent = `Temperament: ${temperament}`;

  catInfo.innerHTML = '';
  catInfo.appendChild(imageElement);
  catInfo.appendChild(breedNameElement);
  catInfo.appendChild(descriptionElement);
  catInfo.appendChild(temperamentElement);
}

// Обробник події зміни вибраної породи
function handleBreedChange() {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    showLoader();
    clearCatInfo();

    fetchCatByBreed(selectedBreedId)
      .then(data => {
        const cat = data[0];
        const { url } = cat;
        const { name, description, temperament } = cat.breeds[0];

        updateCatInfo(url, name, description, temperament);
        hideLoader();
      })
      .catch(error => {
        console.error('Помилка при отриманні інформації про кота:', error);
        showError();
        hideLoader();
      });
  } else {
    clearCatInfo();
  }
}

// Ініціалізація додатку
function initApp() {
  showLoader();
  hideError();

  fetchBreeds()
    .then(breeds => {
      for (const breed of breeds) {
        const { id, name } = breed;
        const optionElement = document.createElement('option');
        optionElement.value = id;
        optionElement.textContent = name;

        breedSelect.appendChild(optionElement);
      }

      breedSelect.addEventListener('change', handleBreedChange);

      hideLoader();
    })
    .catch(error => {
      console.error('Помилка при отриманні колекції порід:', error);
      showError();
      hideLoader();
    });
}

// Запуск додатку
initApp();
