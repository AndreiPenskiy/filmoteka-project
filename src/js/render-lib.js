import renderMovieCard from './homepage-rendering';
import api from './api-service';
import { load, save, remove } from './localstorage';
import nothingHereUrl from '../images/library/blank-cinema.jpg';  // Це посилання на картинку для порожньої бібліотеки
import { onWatchedBtnClick, onQueueBtnClick } from './my-library-header';

const API = new api();
const myLibraryBtn = document.querySelector('.my-library__btn');
const  headerLibrary = document.querySelector('.header');
const spinner = document.querySelector('.spinner');
const searchForm =document.querySelector('.search-form');
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
          gallery.innerHTML = '';
          const arrId = load('watched');
          // console.log(arrId);

          onWatchedBtnClick();
          if (!arrId || arrId.length === 0) {
            showBlankLibrary();
          } else {
            for (let id of arrId) {
              API.getSingleFilmByID(id).then(response => {
                // console.log(id);
                renderMovieCard(response.data);
              });
            }
          }
        }
      }


      function clickQueue(btnQueueLib) {
        btnQueueLib.addEventListener('click', renderQueue);

        function renderQueue() {
          gallery.innerHTML = '';
          const arrId = load('queue');
          // console.log(arrId);

          onQueueBtnClick();
          if (!arrId || arrId.length === 0) {
            showBlankLibrary();
          } else {
            for (let id of arrId) {
              API.getSingleFilmByID(id).then(response => {
                // console.log(response.data);
                renderMovieCard(response.data);
              });
            }
          }
        }
      }

      // console.log(headerLibrary);
      function renderAllList() {
        gallery.innerHTML = '';
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
              renderMovieCard({id, poster_path, title, singleGenre, release_date, vote_average});
            });
          }
        }
      }
}



// Функция для разметки если библиотека пустая
function showBlankLibrary() {
  main.innerHTML =
  ` <a>
      <p class="library"> There are no films in the library yet !</p>
      <img src="${nothingHereUrl}" alt="blank cinema">
    </a>
  `;
  pagination.style.display = 'none';
};