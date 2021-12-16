
// Close modal by Escape
  window.addEventListener('keydown', closeModalByEscape);
  function closeModalByEscape(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalByEscape);
    }
  }


// (() => {
//    const refs = {
//      openModalBtn: document.querySelector('[data-modal-open]'),
 //     closeModalBtn: document.querySelector('[data-modal-close]'),
 //     modal: document.querySelector('[data-modal]'),
  //  };
  
 //   refs.openModalBtn.addEventListener('click', toggleModal);
 //   refs.closeModalBtn.addEventListener('click', toggleModal);
  
 //   function toggleModal() {
 //     refs.modal.classList.toggle('is-hidden');
 //   }
//  })();
