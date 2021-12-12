import filmsAPIService from './api-service';

const trendingFilms = new filmsAPIService();

const homepageLogo = document.querySelector('.logo__list');
const homeBtn = document.querySelector('.home__btn');
const main = document.querySelector('.container__main');
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
let singleGenre;

homepageLogo.addEventListener('click', showTrendMov);
homeBtn.addEventListener('click', showTrendMov);
window.addEventListener('load', showTrendMov);

function showTrendMov(event) {
  event.preventDefault();
  document.querySelector('.search-form').firstElementChild.value = '';
  main.innerHTML = '';
  // console.log('щас буду рендерить фильмы');

  trendingFilms.getTrendingFilms().then(res =>
    res.data.results.forEach(movie => {
      const { title, poster_path, id, vote_average, genre_ids, release_date } = movie;
      // console.log(movie);

      getGenreName(genre_ids);

      const movieEl = document.createElement('li');
      movieEl.classList.add('card__item');

      renderMovieCard(movieEl, id, poster_path, title, singleGenre, release_date, vote_average);
      main.appendChild(movieEl);
    }),
  );
}

// Сохраняем жанры в Loal Storage, достаем по id

trendingFilms
  .getGenres()
  .then(res => res.data.genres.forEach(genre => localStorage.setItem(genre.id, genre.name)));

function getGenreName(ids) {
  ids.forEach(id => {
    singleGenre = localStorage.getItem(id);
    // console.log(singleGenre);
  });
}

// Функция для создания разметки карточки

export default function renderMovieCard(
  element,
  id,
  poster_path,
  title,
  genre,
  release_date,
  vote_average,
) {
  element.innerHTML = `<a class="card__link" id = "${id}" href="#">
        <img src="${IMG_URL + poster_path}" alt ="${title}" class="card__poster">
        
            <h2 class="card__title">${title}</h2>
            <p class="card__description">${genre} | ${release_date.slice(0, 4)}</p>
            <p class="card__rating">${vote_average}</p>
        
        </a>`;
}
