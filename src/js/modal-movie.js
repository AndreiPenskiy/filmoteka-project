import modalMovieTemplate from '../templates/modal-movie.hbs';
import * as basicLightbox from 'basiclightbox';
import api from './api-service';

const newApi = new api();
const movieCard = document.querySelector('.container__main');
movieCard.addEventListener('click', openMovieModal);

function fetchMovieInfo(filmID) {
  return newApi.getSingleFilmByID(filmID).then(response => {
    // console.log(response.data);
    return response.data;
  });
}

function openMovieModal(e) {
  e.preventDefault();

  fetchMovieInfo(e.target.dataset.id).then(data => {
    if (e.target.closest('.card__item')?.querySelector('.picture') === undefined) {
      return;
    }

    const markup = modalMovieTemplate(data);
    const modal = basicLightbox.create(markup);
    modal.show();

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
  });
}
