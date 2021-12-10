import { trendingFilms } from '../index';
import debounce from 'lodash.debounce';

export const searchFilms = function (event) {
  event.preventDefault();

  trendingFilms.searchQuery = event.target.firstElementChild.value;
  if (event.target.firstElementChild.value === ' ') {
    onInvalidSearchQuery();
    return;
  }

  trendingFilms.currentPage = 1;
  trendingFilms.allPages = 1;

  trendingFilms
    .getFilmsByQuery(event.target.firstElementChild.value)
    .then(res => {
      if (res.data.total_results === 0) {
        trendingFilms.allPages = 0;
        return error;
      }
      console.log('фільми за запитом: ', res.data);
      // підказки тут https://docs.google.com/document/d/1Hrx6Rgc6hSu4L69pmSNMm8UyLrBKyviCQcfNAZEx5Q4/edit?usp=sharing
    })
    .catch(error => onInvalidSearchQuery());
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
