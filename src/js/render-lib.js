import renderMovieCard from './homepage-rendering';
import api from './api-service';
import { load, save, remove } from './localstorage';
import nothingHereUrl from '../images/library/blank-cinema.jpg'; // Це посилання на картинку для порожньої бібліотеки
import { onWatchedBtnClick, onQueueBtnClick } from './my-library-header';

const API = new api();
const myLibraryBtn = document.querySelector('.my-library__btn');
const headerLibrary = document.querySelector('.header');
const spinner = document.querySelector('.spinner');
// const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.container__main');
// console.log(searchForm);

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
  // console.log(btnQueueLib);

  renderAllList();

  clickWatched(btnWatchedLib, btnQueueLib);
  clickQueue(btnWatchedLib, btnQueueLib);

  spinner.classList.add('is-hidden');
  function clickWatched(btnWatchedLib) {
    btnWatchedLib.addEventListener('click', renderWatched);

    function renderWatched() {
      gallery.innerHTML = ' ';
      const arrId = load('watched');
      // console.log(arrId);

      onWatchedBtnClick();
      if (!arrId || arrId.length === 0) {
        showBlankLibrary();
      } else {
        for (let id of arrId) {
          API.getSingleFilmByID(id).then(response => {
            // console.log(id);
            // console.log(response.data);
            renderCardFroLib(response.data, id);
          });
        }
      }
    }
  }

  function clickQueue(btnQueueLib) {
    btnQueueLib.addEventListener('click', renderQueue);

    function renderQueue() {
      gallery.innerHTML = ' ';
      const arrId = load('queue');
      // console.log(arrId);

      onQueueBtnClick();
      if (!arrId || arrId.length === 0) {
        showBlankLibrary();
      } else {
        for (let id of arrId) {
          API.getSingleFilmByID(id).then(response => {
            // console.log(response.data);
            // renderMovieCard(response.data);
            renderCardFroLib(response.data, id);
          });
        }
      }
    }
  }

  // console.log(headerLibrary);
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
          // console.log(id);
          renderCardFroLib(response.data, id);
        });
      }
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

function renderCardFroLib(res, id) {
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
