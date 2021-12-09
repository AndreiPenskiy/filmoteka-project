import filmsAPIService from './api-service';

const trendingFilms = new filmsAPIService();

const homepageLink = document.querySelector('.logo__icon');
const main = document.querySelector('.container__main');
const IMG_URL = `https://www.themoviedb.org/t/p/w500`;

homepageLink.addEventListener('click', Click);
function Click() {
    console.log('ку');
}

trendingFilms.getTrendingFilms().then(res => res.json().then(data => showTrendMov(data.results)));


function showTrendMov() {
    main.innerHTML = '';
    console.log('щас буду рендерить фильмы');

    const {title, poster_path, vote_average, genre_ids, release_date} = movie;
    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('card__test');
        movieEl.innerHTML = `<img src="${IMG_URL+poster_path}" alt ="${title}">
        <div class="movie-info">
            <h2>${title}</h2>
            <span class="genre">${genre_ids}</span>
            <span class="year">${release_date}</span>
            <span class="rating">${vote_average}</span>
        </div>`
        main.appendChild(movieEl);
    });
    
}



