// import filmsAPIService from './api-service';

// const singleFilmByID = new filmsAPIService();
// const headerLibrary = document.querySelector('.my-library__btn'); // кнопка навігації My library
// const main = document.querySelector('.container__main'); // main

// const IMG_URL = `https://image.tmdb.org/t/p/w500`;
// let singleGenre;

// headerLibrary.addEventListener('click', showLibrary);



// function showLibrary(event) {
//     event.preventDefault();

//     singleFilmByID.getSingleFilmByID(filmID).then





//     renderMovieCard(movieEl, id, poster_path, title, singleGenre, release_date, vote_average);
//     main.appendChild(movieEl);
// }


// function clear() {
//     main.innerHTML = '';
// }

// //функция проверки наличия в "просмотренных" фильмов и создания массива если нету
// function isGetWatched() {
//   if (localStorage.getItem('watched')) return;
//   localStorage.setItem('watched', '[]');
// }


// //функция проверки наличия в "очереди" фильмов и создания массива если нету
// function isGetQueue() {
//   if (localStorage.getItem('queue')) return;
//   localStorage.setItem('queue', '[]');
// }


// // Функция для создания разметки карточки

//     function renderMovieCard(element, id, poster_path, title, genre, release_date, vote_average) {
//         element.innerHTML = `<a class="card__link" id = "${id}" href="#">
//         <img src="${IMG_URL+poster_path}" alt ="${title}" class="card__poster">
        
//             <h2 class="card__title">${title}</h2>
//             <p class="card__description">${genre} | ${release_date.slice(0,4)}</p>
//             <p class="card__rating">${vote_average}</p>
        
//         </a>`
//     }

// // Сохраняем жанры в Loal Storage, достаем по id

//     trendingFilms.getGenres().then(res => res.data.genres.forEach(genre => 
//         localStorage.setItem(genre.id, genre.name)  
//     ))

//     function getGenreName(ids) {
//         ids.forEach(id => {
//             singleGenre = localStorage.getItem(id);
//             // console.log(singleGenre);         
//         })
// }
    

