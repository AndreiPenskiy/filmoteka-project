import filmsAPIService from './api-service';
import Pagination from 'tui-pagination';
import { pagination, paginationPage, creatingTotalResultsPagination, paginationChangePageShowTrend} from './pagination';
import { language } from './translate';
export const trendingFilms = new filmsAPIService();

const homepageLogo = document.querySelector('.logo__list');
const homeBtn = document.querySelector('.home__btn');
const main = document.querySelector('.container__main');
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
export let singleGenre = [];

homepageLogo.addEventListener('click', showTrendMov);
homeBtn.addEventListener('click', showTrendMov);
window.addEventListener('load', showTrendMov);
    

export function showTrendMov(event) {
  event.preventDefault();
  document.querySelector('.search-form').firstElementChild.value = '';
  trendingFilms.currentPage = 1;
  main.innerHTML = '';
  // console.log('щас буду рендерить фильмы');

  trendingFilms.getTrendingFilms().then(res => {
    //Pagination creating total pages with rendering Main Page
    //Pagination init and check
    trendingFilms.page = paginationPage;
    creatingTotalResultsPagination(res),
    //Pagination End in this module
      
    res.data.results.forEach(movie => {
      const { title, poster_path, id, vote_average, genre_ids, release_date } = movie;
      // console.log(movie);

      // Достаём названия жанров
      getGenreName(genre_ids);

      // Делаем разметку страницы
      renderMovieCard(id, poster_path, title, singleGenre, release_date, vote_average);
    })}
  );
};

//Pagination and rendering of total pages
paginationChangePageShowTrend();

// Сохраняем жанры в Local Storage, достаем по id

trendingFilms
  .getGenres()
  .then(res => res.data.genres.forEach(genre => localStorage.setItem(genre.id, genre.name)));

export const getGenreName = function (ids) {
  singleGenre = [];
  ids.forEach(id => {
    singleGenre.push(localStorage.getItem(id));
  });
};

// Функция для создания разметки карточки

export const renderMovieCard = function (
  id,
  poster_path,
  title,
  genre,
  release_date,
  vote_average,
) {
  const movieEl = document.createElement('li');
  movieEl.classList.add('card__item');

  movieEl.innerHTML = `<a class="card__link" id = "${id}" href="#">
        <img src="${IMG_URL + poster_path}" alt ="${title}" class="card__poster">
        
            <h2 class="card__title">${title}</h2>
            <p class="card__description">${genre.slice(0, 2).join(', ')} | ${release_date.slice(
    0,
    4,
  )}</p>
            <p class="card__rating">${vote_average}</p>
        
        </a>`;
  main.appendChild(movieEl);
};
