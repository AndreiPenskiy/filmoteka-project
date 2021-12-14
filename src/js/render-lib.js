import renderMovieCard from './homepage-rendering';
import api from './api-service';
import { load, save, remove } from './localstorage';
import nothingHereUrl from '../images/library/blank-cinema.jpg'; // Це посилання на картинку для порожньої бібліотеки
import { onWatchedBtnClick, onQueueBtnClick } from './my-library-header';
const API = new api();
const myLibraryBtn = document.querySelector('.my-library__btn');
const headerLibrary = document.querySelector('.header');
const spinner = document.querySelector('.spinner');
const gallery = document.querySelector('.container__main');
myLibraryBtn.addEventListener('click', renderPageLibrary);
async function renderPageLibrary(event) {
  // if (headerLibrary.classList.contains('header__my-library')) {
  //   event.preventDefault();
  //   return;
  // }
  // const writeEvent = event => {
  // spinner.classList.remove('is-hidden');
  event.preventDefault();
  const btnWatchedLib = document.querySelector('.watched-btn');
  const btnQueueLib = document.querySelector('.queue-btn');

  btnWatchedLib.classList.remove('active');
  btnQueueLib.classList.remove('active');
  renderAllList();

  btnWatchedLib.addEventListener('click', renderWatched);
  btnQueueLib.addEventListener('click', renderQueue);
}
function renderWatched() {
  gallery.innerHTML = ' ';
  const arrId = load('watched');
  onWatchedBtnClick();
  if (!arrId || arrId.length === 0) {
    showBlankLibrary();
  } else {
    for (let id of arrId) {
      API.getSingleFilmByID(id).then(response => {
        renderCardForLib(response.data, id);
      });
    }
  }
}
function renderQueue() {
  gallery.innerHTML = ' ';
  const arrId = load('queue');
  onQueueBtnClick();
  if (!arrId || arrId.length === 0) {
    showBlankLibrary();
  } else {
    for (let id of arrId) {
      API.getSingleFilmByID(id).then(response => {
        renderCardForLib(response.data, id);
      });
    }
  }
}
function renderAllList() {
  gallery.innerHTML = ' ';
  let arrWatchId = [];
  let arrQueueId = [];
  if (load('watched')) {
    arrWatchId = load('watched');
  }
  if (load('queue')) {
    arrQueueId = load('queue');
  }
  const arrAllId = [...arrWatchId, ...arrQueueId];
  if (arrWatchId.length === 0 && arrQueueId.length === 0) {
    showBlankLibrary();
  } else {
    for (let id of arrAllId) {
      API.getSingleFilmByID(id).then(response => {
        renderCardForLib(response.data, id);
      });
    }
  }
}
// РОЗМІТКА
function showBlankLibrary() {
  main.innerHTML = ` <a>
      <p class="library"> There are no films in the library yet !</p>
      <img src="${nothingHereUrl}" alt="blank cinema">
    </a>
  `;
  pagination.style.display = 'none';
}
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
  document.querySelector('.container__main').appendChild(movieEl);
}
