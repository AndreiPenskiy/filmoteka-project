import filmsAPIService from './api-service';
// import markupGallery from './markupGrid';

const trendingFilms = new filmsAPIService();

const homepageLink = document.querySelector('.logo__list');
const main = document.querySelector('.container__main');
const IMG_URL = `https://image.tmdb.org/t/p/w500`;

homepageLink.addEventListener('click', showTrendMov);
  

function showTrendMov(event) {
    event.preventDefault();
    main.innerHTML = '';
    console.log('щас буду рендерить фильмы');
    
    
    trendingFilms.getTrendingFilms().then(res => res.data.results.forEach(movie => {
        const {title, poster_path, vote_average, genre_ids, release_date} = movie;
        console.log(movie);

        

        const movieEl = document.createElement('li');
        movieEl.classList.add('card__item');
        movieEl.innerHTML = `<a class="card__link" href="#">
        <img src="${IMG_URL+poster_path}" alt ="${title}" class="card__poster">
        
            <h2 class="card__title">${title}</h2>
            <p class="card__description">${genre_ids} | ${release_date.slice(0,4)}</p>
            <p class="card__rating">${vote_average}</p>
        
        </a>`
        main.appendChild(movieEl);
    })
    
    )}


