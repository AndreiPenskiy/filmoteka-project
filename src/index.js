import './sass/main.scss';
//import axios from "axios";
//import SimpleLightbox from 'simplelightbox';
//import 'simplelightbox/dist/simple-lightbox.min.css';
//import Pagination from 'tui-pagination';

import './js/pagination.js';
import filmsAPIService from './js/API-service';
import { searchFilms } from './js/search';

const trendingFilms = new filmsAPIService();
trendingFilms.page = 3; //приклад використання для пагінації
trendingFilms.language = 'en'; //приклад використання для локалізації

//ДАНІ З БЕКЕНДУ ДЛЯ ГОЛОВНОЇ СТОРІНКИ
trendingFilms.getTrendingFilms().then(res => console.log('популярні фільми: ', res.data));
// підказки тут https://docs.google.com/document/d/1Hrx6Rgc6hSu4L69pmSNMm8UyLrBKyviCQcfNAZEx5Q4/edit?usp=sharing

//приклад використання - витягнути дані одного фільму по його id
trendingFilms.getSingleFilmByID(497698).then(res => console.log('окремий фільм:', res.data));
// підказки тут https://docs.google.com/document/d/1Hrx6Rgc6hSu4L69pmSNMm8UyLrBKyviCQcfNAZEx5Q4/edit?usp=sharing

//приклад використання - ВСІ ЖАНРИ
trendingFilms.getGenres().then(res => console.log('всі жанри', res.data));

//РЕАЛІЗАЦІЯ ПОШУКУ (без рендерінгу розмітки)
const searchInput = document.querySelector('.search-form');
searchInput.addEventListener('submit', searchFilms);
