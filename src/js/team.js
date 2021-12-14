
function showModal() {
  const darkLayer = document.createElement('div'); // слой затемнения
  darkLayer.id = 'shadow'; // id чтобы подхватить стиль
  document.body.appendChild(darkLayer); // включаем затемнение

  const modalWin = document.getElementById('popup'); // находим наше "окно"
  modalWin.style.display = 'block'; // "включаем" его

  darkLayer.onclick = function() { // при клике на слой затемнения все исчезнет
    darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
    modalWin.style.display = 'none'; // делаем окно невидимым
    return false;
  };
}

showModal.addEventListener("click", showModal);