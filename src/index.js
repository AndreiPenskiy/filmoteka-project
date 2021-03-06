import './sass/main.scss';
//import axios from "axios";
//import SimpleLightbox from 'simplelightbox';
//import 'simplelightbox/dist/simple-lightbox.min.css';
// import Pagination from 'tui-pagination';

import filmsAPIService from './js/api-service';
import { searchFilms } from './js/search';
import './js/modal-movie.js';
import './js/my-library-header';
import './js/btn-theme';
import './js/firebaseGoogleAuth';
import './js/homepage-rendering';
import './js/translate';
import './js/team';
import './js/trailer';
import './js/localstorage';
import './js/pagination';
import './js/render-lib';
import './js/search';

import { trendingFilms } from './js/homepage-rendering';
    
// trendingFilms.getAllGenres();
// trendingFilms.page = 1; //приклад використання для пагінації
// trendingFilms.language = 'en'; //приклад використання для локалізації

// //ДАНІ З БЕКЕНДУ ДЛЯ ГОЛОВНОЇ СТОРІНКИ
// trendingFilms.getTrendingFilms().then(res => console.log('популярні фільми: ', res.data));
// // підказки тут https://docs.google.com/document/d/1Hrx6Rgc6hSu4L69pmSNMm8UyLrBKyviCQcfNAZEx5Q4/edit?usp=sharing

// //приклад використання - витягнути дані одного фільму по його id
// trendingFilms.getSingleFilmByID(497698).then(res => console.log('окремий фільм:', res.data));
// // підказки тут https://docs.google.com/document/d/1Hrx6Rgc6hSu4L69pmSNMm8UyLrBKyviCQcfNAZEx5Q4/edit?usp=sharing

// //приклад використання - ВСІ ЖАНРИ
// trendingFilms.getGenres().then(res => console.log('всі жанри', res.data));

//РЕАЛІЗАЦІЯ ПОШУКУ
const searchInput = document.querySelector('.search-form');
searchInput.addEventListener('submit', searchFilms);
