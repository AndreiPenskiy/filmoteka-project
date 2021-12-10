import teamModal from '../partials/team.html';
import '../sass/main.scss';

const movieCard = document.querySelector('.footer-team-link');
movieCard.addEventListener('click', openTeamModal);

function openTeamModal(e) {
  
  e.preventDefault();

  const markup = teamModal();
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


// (() => {
//   const btns = {
    
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.querySelector(".team-modal-close-button"),
//     modal: document.querySelector(".backdrop"),
//   };

//   btns.openModalBtn.addEventListener("click", openModal);
  
//   function openModal(event) {
//     event.preventDefault()
//       btns.modal.classList.remove("is-hidden");
//       window.addEventListener("keydown", onPressEscape);
//       btns.closeModalBtn.addEventListener("click", closeModal);
//     btns.modal.addEventListener("click", backdropCloseModal);
//     refs.body.classList.add('scroll-hidden');
//     };
//   function closeModal() {
// refs.body.classList.remove('scroll-hidden');
//     btns.closeModalBtn.removeEventListener("click", closeModal);
//     btns.modal.classList.add("is-hidden");
//     btns.modal.removeEventListener("click", closeModal);
//   window.removeEventListener('keydown', onPressEscape);
//   }
//   function onPressEscape(event) {
//     if (event.code === 'Escape') {
//       closeModal();
//     }
//   }
//   function backdropCloseModal(event) {
//     if (event.currentTarget === event.target) {
//     closeModal();
//   }
//   }
// })();

// (() => {
//     const refs = {
//       openModalBtn: document.querySelector('[data-modal-open]'),
//       closeModalBtn: document.querySelector('[data-modal-close]'),
//       modal: document.querySelector('[data-modal]'),
//     };
  
//     refs.openModalBtn.addEventListener('click', toggleModal);
//     refs.closeModalBtn.addEventListener('click', toggleModal);
  
//     function toggleModal() {
//       refs.modal.classList.toggle('is-hidden');
//     }
//   })();
