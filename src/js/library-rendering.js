import filmsAPIService from './api-service';

import nothingHereUrl from '../images/library/blank-cinema.jpg';  // Це посилання на картинку для порожньої бібліотеки
import renderMovieCard from './homepage-rendering';  // Це створення розмітки картки з головної сторінки

const singleFilmByID = new filmsAPIService();
const headerLibrary = document.querySelector('.my-library__btn'); // кнопка навігації My library
const main = document.querySelector('.container__main'); // main

const IMG_URL = `https://image.tmdb.org/t/p/w500`;


// потом это буду импортировать от Василия
// const queueID = [580489];
let queueID = [];
let watchedID = [];
let filmsID = [...queueID, ...watchedID];

headerLibrary.addEventListener('click', showLibrary);

function showLibrary() {
    clear();             // Функция очиски сетки
    showBlankLibrary(); // Функция для разметки если библиотека пустая
    
    // singleFilmByID.getSingleFilmByID(queueID).then(res =>
   
        
    const movieEl = document.createElement('li');
    movieEl.classList.add('card__item');

    renderMovieCard(movieEl, id, poster_path, title, release_date, vote_average);
    main.appendChild(movieEl);
};

// Функция очиски сетки
function clear() {
    main.innerHTML = '';
};

// Функция для разметки если библиотека пустая
function showBlankLibrary() {
    if (filmsID.length > 0) {
        return;
  }
    main.innerHTML =
    ` <a> 
        <p class="library"> There are no films in the library yet !</p>
        <img src="${nothingHereUrl}" alt="blank cinema">
      </a>
    `;
    pagination.style.display = 'none';
};

// // Функция Юли для создания разметки карточки
//   function renderMovieCard(element, id, poster_path, title, genre, release_date, vote_average) {
//       element.innerHTML = `<a class="card__link" id = "${id}" href="#">
//       <img src="${IMG_URL+poster_path}" alt ="${title}" class="card__poster">
//       <h2 class="card__title">${title}</h2>
//       <p class="card__description">${genre} | ${release_date.slice(0,4)}</p>
//       <p class="card__rating">${vote_average}</p>
//      </a>`
// };


//  может надо бля части Василия
//функция проверки наличия в "просмотренных" фильмов и создания массива если нету
function isGetWatched() {
  if (localStorage.getItem('watchedID')) return;
  localStorage.setItem('watchedID', '[]');
};
//функция проверки наличия в "очереди" фильмов и создания массива если нету
function isGetQueue() {
  if (localStorage.getItem('queueID')) return;
  localStorage.setItem('queueID', '[]');
};
    

