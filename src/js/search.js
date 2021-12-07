import filmsAPIService from './api-service';

const films = new filmsAPIService();

export const searchFilms = function (event) {
  event.preventDefault();
  onValidSearchQuery();
  films
    .getFilmsByQuery(event.target.firstElementChild.value)
    .then(res => {
      if (res.data.total_results === 0) {
        onInvalidSearchQuery();
        return;
      }
      console.log('фільми за запитом: ', res.data);
      // підказки тут https://docs.google.com/document/d/1Hrx6Rgc6hSu4L69pmSNMm8UyLrBKyviCQcfNAZEx5Q4/edit?usp=sharing
    })
    .catch(error => onInvalidSearchQuery());
};

const onInvalidSearchQuery = function () {
  document.querySelector('.search-notification').innerHTML =
    'Search result was NOT successful. Enter the correct movie name and try again!';
};
const onValidSearchQuery = function () {
  document.querySelector('.search-notification').innerHTML = '';
};
