const header = document.querySelector('.header'); // хедер
const form = document.querySelector('.input__wrapper'); // форма хедеру
// const searchNotification = document.querySelector('.search-notification'); // оповіщення про не вірний пошук по сайту
const headerHome = document.querySelector('.home__btn'); // кнопка навігації Home
const headerLibrary = document.querySelector('.my-library__btn'); // кнопка навігації My library
const myLibraryBtnList = document.querySelector('.library-btn__list'); // кнопки хедеру My library Watched та Queue
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');

headerHome.addEventListener('click', onheaderHomeBtnClick);
headerLibrary.addEventListener('click', onMyLibraryBtnClick);
watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);

function onheaderHomeBtnClick() {
  myLibraryBtnList.classList.add('is-hidden'); // приховуються кнопки Watched та Queue
  form.classList.remove('is-hidden'); // з'являється форма
  // searchNotification.classList.remove('is-hidden') // з'являється поле для виведення оповіщення
  headerHome.classList.add('current'); // додається помаранчеве підкреслення з кнопки Home
  headerLibrary.classList.remove('current'); // видаляється помаранчеве підкреслення кнопки My library
  header.classList.remove('header__my-library'); // видаляється фонове зображення сторінки My library
}

function onMyLibraryBtnClick() {
  form.classList.add('is-hidden'); // приховується форма
  //   searchNotification.classList.add('is-hidden'); // приховується поле для виведення оповіщення
  myLibraryBtnList.classList.remove('is-hidden'); //з'являються кнопки Watched та Queue
  headerLibrary.classList.add('current'); // додається помаранчеве підкреслення кнопки My library
  headerHome.classList.remove('current'); // видаляється помаранчеве підкреслення з кнопки Home
  header.classList.add('header__my-library'); // додається нове фонове зображення хедера
}

function onWatchedBtnClick() {
  queueBtn.classList.remove('active');
  watchedBtn.classList.add('active');
}

function onQueueBtnClick() {
  watchedBtn.classList.remove('active');
  queueBtn.classList.add('active');
}

// add-to-watched/watched-btn
export { onWatchedBtnClick, onQueueBtnClick };