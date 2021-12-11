import { trendingFilms } from '../index';
import debounce from 'lodash.debounce';
import renderMovieCard from './homepage-rendering';

export const searchFilms = function (event) {
  event.preventDefault();

  trendingFilms.searchQuery = event.target.firstElementChild.value;
  if (event.target.firstElementChild.value === ' ') {
    onInvalidSearchQuery();
    return;
  }

  trendingFilms.currentPage = 1;
  trendingFilms.allPages = 1;
  document.querySelector('.container__main').innerHTML = ' ';

  trendingFilms
    .getFilmsByQuery(event.target.firstElementChild.value)
    .then(res => {
      if (res.data.total_results === 0) {
        trendingFilms.allPages = 0;
        return error;
      }
      res.data.results.forEach(movie => {
        const { title, poster_path, id, vote_average, genre_ids, release_date } = movie;

        const temp = [];
        if (genre_ids.length !== 0) {
          for (let i = 0; i < genre_ids.length && i < 2; i += 1) {
            temp.push(...trendingFilms.allGenres.filter(genre => genre.id === genre_ids[i]));
          }
        }
        const genresByNames = temp.map(el => el.name).join(', ');

        const movieEl = document.createElement('li');
        movieEl.classList.add('card__item');

        renderMovieCard(movieEl, id, poster_path, title, genresByNames, release_date, vote_average);
        document.querySelector('.container__main').appendChild(movieEl);
      });
    })
    .catch(error => console.log('oooooooops ', error));
};

const onInvalidSearchQuery = function () {
  const notification = `<p class="search-notification">
    Search result was NOT successful. Enter the correct movie name and try again!
  </p>;`;
  document.querySelector('.search-form').insertAdjacentHTML('beforeend', notification);
  const removeNotification = debounce(() => {
    document.querySelector('.search-form').lastElementChild.remove();
  }, 2000);
  removeNotification();
};
