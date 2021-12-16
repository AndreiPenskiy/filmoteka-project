
// Close modal by Escape
  window.addEventListener('keydown', closeModalByEscape);
  function closeModalByEscape(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalByEscape);
    }
  }