(() => {
  const btns = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector(".team-modal-close-button"),
    modal: document.querySelector(".backdrop"),
  };

  btns.openModalBtn.addEventListener("click", openModal);
  
  function openModal() {
      btns.modal.classList.remove("is-hidden");
      window.addEventListener("keydown", onPressEscape);
      btns.closeModalBtn.addEventListener("click", closeModal);
    btns.modal.addEventListener("click", backdropCloseModal);
    refs.body.classList.add('scroll-hidden');
    };
  function closeModal() {
refs.body.classList.remove('scroll-hidden');
    btns.closeModalBtn.removeEventListener("click", closeModal);
    btns.modal.classList.add("is-hidden");
    btns.modal.removeEventListener("click", closeModal);
  window.removeEventListener('keydown', onPressEscape);
  }
  function onPressEscape(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }
  function backdropCloseModal(event) {
    if (event.currentTarget === event.target) {
    closeModal();
  }
  }
})();

