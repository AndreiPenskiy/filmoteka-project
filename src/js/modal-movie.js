import modalMovieTemplate from '../templates/modal-movie.hbs';
import * as basicLightbox from 'basiclightbox';
import '../sass/main.scss';

const movieCard = document.querySelector('.container__main');
movieCard.addEventListener('click', openMovieModal);

function openMovieModal(e) {
  if (e.target.closest('.card__item')?.querySelector('.picture') === undefined) {
    return;
  }
  e.preventDefault();

  const markup = modalMovieTemplate();
  const modal = basicLightbox.create(markup);
  modal.show();

  // Закрытие модалки по Кнопке
  const closeBtn = document.querySelector('.modal-movie-btn-close');
  closeBtn.addEventListener('click', closeModalBtn);
  function closeModalBtn() {
    modal.close();
    window.removeEventListener('keydown', closeModalBtn);
  }

  // Закрытие модалки по Escape
  window.addEventListener('keydown', closeModalHandler);
  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
