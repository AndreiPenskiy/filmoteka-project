import modalMovieTemplate from '../templates/modal-movie.hbs';
import * as basicLightbox from 'basiclightbox';
import api from './api-service';
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
