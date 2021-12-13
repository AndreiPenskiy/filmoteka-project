import modalMovieTemplate from '../templates/modal-movie.hbs';
import * as basicLightbox from 'basiclightbox';
import api from './api-service';
import { load, save, remove } from './localstorage';
import onTrailerClick from './trailer';

const newApi = new api();
const movieCard = document.querySelector('.container__main');
movieCard.addEventListener('click', onMovieCardClick);

///// Fetch movie by ID /////
function fetchMovieData(filmID) {
  return newApi.getSingleFilmByID(filmID).then(response => {
    return response.data;
  });
}

///// Click event listener /////
function onMovieCardClick(e) {
  e.preventDefault();
  if (e.target.closest('.card__link')?.querySelector('card__poster') === undefined) {
    return;
  }

  fetchMovieData(e.target.closest('.card__link').id)
    .then(renderMovieModal)
    .catch(error => {
      console.log(error);
    });
}

///// Render modal template /////
function renderMovieModal(data) {
  const markup = modalMovieTemplate(data);
  const modal = basicLightbox.create(markup);
  modal.show();

  const btnQueue = document.querySelector('.btn-to-queue');
  const btnWatch = document.querySelector('.btn-to-watched');

  btnQueue.addEventListener('click', addQueueList);
  btnWatch.addEventListener('click', addWatchList);

  async function textModalBtn(id) {
    const btnQueue = document.querySelector('.btn-to-queue');
    const btnWatch = document.querySelector('.btn-to-watched');
    if (inList(id, 'watched')) {

      btnWatch.textContent = 'Added to watched';
      btnWatch.disabled = true;
      function changeText() {
        btnWatch.disabled = false;
        btnWatch.textContent = 'Remove from watched';
        btnWatch.classList.add('active');
      }
      setTimeout(changeText, 1000);
    } else {

      btnWatch.textContent = 'Add to watched';
      btnWatch.classList.remove('active');

      btnWatch.disabled = false;
    }

    if (inList(id, 'queue')) {

      btnQueue.textContent = 'Added to queue';
      btnQueue.disabled = true;
      function changeText() {
        btnQueue.disabled = false;
        btnQueue.textContent = 'Remove from queue';
        btnQueue.classList.add('active');
      }
      setTimeout(changeText, 1000);
    } else {

      btnQueue.textContent = 'Add to queue';
      btnQueue.classList.remove('active');
      btnQueue.disabled = false;
    }
  }

  function addWatchList() {
    const btnWatch = document.querySelector('.btn-to-watched');
    let id = btnWatch.dataset.action;
    console.log(id);
    if (btnWatch.classList.contains('active')) {
      removeFromWatchedList(id);
    } else {
      let watchList = [];
      let localWatchListJson = load('watched');
      if (localWatchListJson) {
        watchList = [...localWatchListJson];
      }

      let queueList = [];
      let localQueueListJson = load('queue');
      if (localQueueListJson) {
        queueList = [...localQueueListJson];
      }
      let queueSet = new Set(queueList);
      if (queueSet.has(id)) {
        remove('queue');
        let index = queueList.indexOf(id);
        queueList.splice(index, 1);
        save('queue', queueList);
      }

      const watchSet = new Set(watchList);
      if (watchSet.has(id)) {
        textModalBtn(id);
      } else {
        watchList.push(id);
        save('watched', watchList);
        textModalBtn(id);
      }
    }
  }

  function removeFromWatchedList(id) {
    console.log('удаляем из watched');
    let watchList = [];
    let localWatchListJson = load('watched');
    if (localWatchListJson) {
      watchList = [...localWatchListJson];
    }

    remove('watched');
    let index = watchList.indexOf(id);
    watchList.splice(index, 1);
    save('watched', watchList);

    textModalBtn();
  }

  function removeFromQueueList(id) {
    console.log('удаляем из queue');
    let queueList = [];
    let localQueueListJson = load('queue');
    if (localQueueListJson) {
      queueList = [...localQueueListJson];
    }

    remove('queue');
    let index = queueList.indexOf(id);
    queueList.splice(index, 1);
    save('queue', queueList);

    textModalBtn();
  }

  function addQueueList() {
    const btnQueue = document.querySelector('.btn-to-queue');
    let id = btnQueue.dataset.action;
    if (btnQueue.classList.contains('active')) {
      removeFromQueueList(id);
    } else {
      let queueList = [];
      let localQueueListJson = load('queue');
      if (localQueueListJson) {
        queueList = [...localQueueListJson];
      }

      let watchList = [];
      let localWatchListJson = load('watched');
      if (localWatchListJson) {
        watchList = [...localWatchListJson];
      }
      let watchSet = new Set(watchList);
      if (watchSet.has(id)) {
        remove('watched');
        let index = watchList.indexOf(id);
        watchList.splice(index, 1);
        save('watched', watchList);
      }

      const queueSet = new Set(queueList);
      if (queueSet.has(id)) {
        textModalBtn(id);
      } else {
        queueList.push(id);
        save('queue', queueList);
        textModalBtn(id);
      }
    }
  }
  onTrailerClick();

  // Close modal by Button
  const closeBtn = document.querySelector('.modal-movie-close');
  closeBtn.addEventListener('click', closeModalByBtn);
  function closeModalByBtn() {
    modal.close();
    window.removeEventListener('keydown', closeModalByBtn);
  }

  // Close modal by Escape
  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalByEsc);
    }
  }
}

function inList(id, list) {
  let arrList = [];
  let localListJson = load(list);
  if (localListJson) {
    arrList = [...localListJson];
  }
  const listSet = new Set(arrList);
  return listSet.has(id);
}