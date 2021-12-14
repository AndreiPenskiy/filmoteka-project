import filmsAPIService from './api-service';

import nothingHereUrl from '../images/library/blank-cinema.jpg';  // Це посилання на картинку для порожньої бібліотеки

const singleFilmByID = new filmsAPIService();
const headerLibrary = document.querySelector('.my-library__btn'); // кнопка навігації My library
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');

const main = document.querySelector('.container__main'); // main

headerLibrary.addEventListener('click', showWatched);
watchedBtn.addEventListener('click', showWatched);
queueBtn.addEventListener('click', showQueue);


function showWatched() {
    clear();             
    let watchedID = localStorage.getItem('watched');
    
    console.log(`это я вывожу ${watchedID}`);

    if (watchedID) {
        const parceID = JSON.parse(watchedID);
          
        for (let i = 0; i < parceID.length; i += 1) {
            let id = parceID[i];
            singleFilmByID.getSingleFilmByID(id)
                .then(response => {
                renderCardForLib(response.data, id);
                });
            }
    };
};


function showQueue() {
    clear();             
    let queueID = localStorage.getItem('queue');
    if (!queueID || queueID.length === 0) {
        showBlankLibrary();
        return;
    }
   
    if (queueID) {
        const parceID = JSON.parse(queueID);
        
        for (let i = 0; i < parceID.length; i += 1) {
            let id = parceID[i];
            console.log(`'это АйДи с Локал ${id}`);
            singleFilmByID.getSingleFilmByID(id)
                .then(response => {
                renderCardForLib(response.data, id);
                });
        }
    };
};

// Функция очиски сетки
function clear() {
    main.innerHTML = '';
};

// Функция для разметки если библиотека пустая
function showBlankLibrary() {
    main.innerHTML =
    ` <a> 
        <p class="library"> There are no films yet !</p>
        <img src="${nothingHereUrl}" alt="blank cinema">
      </a>
    `;
    pagination.style.display = 'none';
};

// Функция создания разметки карточки
function renderCardForLib(res, id) {
  const poster_url = `src="https://www.themoviedb.org/t/p/w500/${res.poster_path}"`;
  const genres = res.genres[0].name;
  const movieEl = document.createElement('li');
  movieEl.classList.add('card__item');
  movieEl.innerHTML = `<a class="card__link" id = "${id}" href="#">
                <img ${poster_url} alt ="${res.title}" class="card__poster">
        
            <h2 class="card__title">${res.title}</h2>
            <p class="card__description">${genres} | ${res.release_date.slice(0, 4)}</p>
            <p class="card__rating">${res.vote_average}</p>
        
                </a>`;
  main.appendChild(movieEl);
}