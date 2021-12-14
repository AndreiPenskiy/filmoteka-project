import debounce from 'lodash.debounce';
import { renderMovieCard, trendingFilms, getGenreName } from './homepage-rendering';
let singleGenre = [];
import nothingHereUrl from '../images/library/blank-cinema.jpg';

export const searchFilms = function (event) {
  event.preventDefault();
  trendingFilms.currentPage = 1;
  trendingFilms.allPages = 1;
  document.querySelector('.container__main').innerHTML = ' ';

  trendingFilms.searchQuery = event.target.firstElementChild.value;
  if (event.target.firstElementChild.value === ' ') {
    onInvalidSearchQuery();
    return;
  }

  trendingFilms
    .getFilmsByQuery(event.target.firstElementChild.value)
    .then(res => {
      if (res.data.total_results === 0) {
        trendingFilms.allPages = 0;
        return error;
      }
      res.data.results.forEach(movie => {
        const { title, poster_path, id, vote_average, genre_ids, release_date } = movie;

        getGenreName(genre_ids);

        renderMovieCard(id, poster_path, title, singleGenre, release_date, vote_average);
      });
    })
    .catch(error => {
      onInvalidSearchQuery();
    });
};

// function getGenreName(ids) {
//   singleGenre = [];
//   ids.forEach(id => {
//     singleGenre.push(localStorage.getItem(id));
//   });
// }

const onInvalidSearchQuery = function () {
  const notification = `<p class="search-notification">
    Search result was NOT successful. Enter the correct movie name and try again!
  </p>;`;
  document.querySelector('.search-form').insertAdjacentHTML('beforeend', notification);
  const removeNotification = debounce(() => {
    document.querySelector('.search-form').lastElementChild.remove();
  }, 2000);

  document.querySelector(
    '.container__main',
  ).innerHTML = `<img src="${nothingHereUrl}" alt="blank cinema">`;
  removeNotification();
};
