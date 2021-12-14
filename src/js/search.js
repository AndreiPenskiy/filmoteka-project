import debounce from 'lodash.debounce';

const main = document.querySelector('.container__main');
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


        try {
          renderCardForSearch(movie);
        } catch (error) {
          // console.log('Only films with full info are shown');
        }
        return movie;
      });
    })
    .catch(error => {
      onInvalidSearchQuery();
    });
};

function renderCardForSearch(res) {
  let poster_url;
  if (!res.poster_path) {
    poster_url = `src='https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg'`;
  } else {
    poster_url = `src="https://www.themoviedb.org/t/p/w500/${res.poster_path}"`;
  }

  let singleGenre = [];
  for (let i = 0; i < 2; i += 1) {
    singleGenre.push(localStorage.getItem(res.genre_ids[i]));
  }
  const genres = singleGenre.join(', ');

  const movieEl = document.createElement('li');
  movieEl.classList.add('card__item');
  movieEl.innerHTML = `<a class="card__link" id = "${res.id}" href="#">
                <img ${poster_url} alt ="${res.title}" class="card__poster">
        
            <h2 class="card__title">${res.title}</h2>
            <p class="card__description">${genres} | ${res.release_date.slice(0, 4)}</p>
            <p class="card__rating">${res.vote_average}</p>
        
                </a>`;
  main.appendChild(movieEl);
}

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
  document.querySelector('.container__main').innerHTML = ' ';
};
