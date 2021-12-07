const header = document.querySelector('.header'); // хедер
const form = document.querySelector('.input__wrapper'); // форма хедеру
const headerHome = document.querySelector('.home__btn'); // кнопка навігації Home
const headerLibrary = document.querySelector('.my-library__btn'); // кнопка навігації My library
const myLibraryBtnList = document.querySelector('.library-btn__list'); // кнопки хедеру My library Watched та Queue

headerHome.addEventListener('click', onheaderHomeBtnClick);
headerLibrary.addEventListener('click', onMyLibraryBtnClick);

function onheaderHomeBtnClick () {
    myLibraryBtnList.classList.add('is-hidden') // приховуються кнопки Watched та Queue
    form.classList.remove('is-hidden') // з'являється форма
    headerHome.classList.add('current'); // додається помаранчеве підкреслення з кнопки Home
    headerLibrary.classList.remove('current'); // видаляється помаранчеве підкреслення кнопки My library
    header.classList.remove('header__my-library'); // видаляється фонове зображення сторінки My library

}

function onMyLibraryBtnClick () {
    form.classList.add('is-hidden') // приховується форма
    myLibraryBtnList.classList.remove('is-hidden') //з'являються кнопки Watched та Queue
    headerLibrary.classList.add('current'); // додається помаранчеве підкреслення кнопки My library
    headerHome.classList.remove('current'); // видаляється помаранчеве підкреслення з кнопки Home
    header.classList.add('header__my-library'); // додається нове фонове зображення хедера
}
