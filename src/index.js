import './sass/main.scss';
//import axios from "axios";
//import SimpleLightbox from 'simplelightbox';
//import 'simplelightbox/dist/simple-lightbox.min.css';
import Pagination from 'tui-pagination';

import filmsAPIService from './js/api-service';
import { searchFilms } from './js/search';
import './js/modal-movie.js';
import './js/my-library-header';
import './js/btn-theme';
import './js/firebaseGoogleAuth';
import './js/homepage-rendering';
import './js/translate';
import './js/trailer';
import './js/localstorage';
import './js/library-rendering';

import { trendingFilms } from './js/homepage-rendering';

const paginationOptions = {
    totalItems: 0,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,

        template: {
            page: '<a href="#" class="tui-page-btn color-day">{{page}}</a>',
                currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
                    moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}} color-day">' +
                '<span class="tui-ico-{{type}}">:::</span>' +
                '</a>',
                disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}} color-day">' +
                '<span class="tui-ico-{{type}}">:::</span>' +
                '</span>',
                moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}} color-day">...' +
                '<span class="tui-ico-ellip"></span>' +
                '</a>',
        },
};
var pagination = new Pagination('pagination', paginationOptions);

const page = pagination.getCurrentPage();
console.log(page);
trendingFilms.page = page;

fetchImages(page).then(res => {
    pagination.reset(res.total_results);
    paginationOptions.totalItems = res.total_results;
});

pagination.on('afterMove', event => {
    
        // console.log(event);

        const currentPage = event.page;
        trendingFilms.page = currentPage;
    
        // console.log(trendingFilms);

    fetchImages(trendingFilms.page).then(res => {
            
            console.log(res);

            paginationOptions.totalItems = res.total_results;
            paginationOptions.page = res.page;

            console.log("paginationOptions = ", paginationOptions);
            
            
        });
    

    });

function fetchImages(page) {
  
        return trendingFilms.getTrendingFilms(page)
            .then(res => ({ page: res.data.page, total_pages: res.data.total_pages, results: res.data.results, total_results: res.data.total_results }))
    
    };

trendingFilms.getAllGenres();
// trendingFilms.page = 1; //приклад використання для пагінації
trendingFilms.language = 'en'; //приклад використання для локалізації

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
