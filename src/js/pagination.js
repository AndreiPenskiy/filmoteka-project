import Pagination from 'tui-pagination';
import filmsAPIService from './api-service';
import { trendingFilms, getGenreName, renderMovieCard, main, singleGenre } from './homepage-rendering';

//--------------------------------------------------------------
//Init Pagination
export const paginationOptions = {
    totalItems: 0,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,

        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
                currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
                    moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
                '<span class="tui-ico-{{type}}">:::</span>' +
                '</a>',
                disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
                '<span class="tui-ico-{{type}}">:::</span>' +
                '</span>',
                moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">...' +
                '<span class="tui-ico-ellip"></span>' +
                '</a>',
        },
};
export var pagination = new Pagination('pagination', paginationOptions);
    

//Pagination first start with response from API and create total_pages
//Go to Homepage-rendering.js
//
export const paginationPage = pagination.getCurrentPage();
//--------------------------------------------------------------

//--------------------------------------------------------------
//Go to Homepage-rendering.js
export function creatingTotalResultsPagination(res) {
    pagination.reset(res.data.total_results);
};
//--------------------------------------------------------------

//Pagination change number of page, Fetch data and Render pages
//Go to Homepage-rendering.js
//
export function paginationChangePageShowTrend() {
    
    pagination.on('afterMove', event => {
        //Current pagination page go to trendingFilms.page
        const currentPage = event.page;
        trendingFilms.page = currentPage;
        // console.log("trendingFilms.page", trendingFilms.page);
    
        //Cleaning main 
        document.querySelector('.search-form').firstElementChild.value = '';
        document.querySelector('.container__main').innerHTML = '';
        
        // Rendering
        trendingFilms.getTrendingFilms().then(res => {
            //Pagination creating total pages with rendering Main Page
            //console.log(res.data);
            //console.log("paginationOptions = ", paginationOptions)
                
                res.data.results.forEach(movie => {
                    const { title, poster_path, id, vote_average, genre_ids, release_date } = movie;
                    // console.log(movie);

                    // Достаём названия жанров
                    getGenreName(genre_ids);

                    // Делаем разметку страницы
                    renderMovieCard(id, poster_path, title, singleGenre, release_date, vote_average);
                })
        }
        );
    })
};
//--------------------------------------------------------------

//--------------------------------------------------------------
//Pagination change Theme day night
export function changePaginationTheme() {
    const tuiElement = document.querySelector('.tui-pagination');
    if (document.querySelector('body').className === 'body-theme') {
        
        for (const variable of tuiElement.children) {
            variable.className = variable.className + ' color-number';
        }
        //console.log(tuiElement.children);

        pagination.on('afterMove', event => {
            
            for (const variable of tuiElement.children) {
            variable.className = variable.className + ' color-number';
        }
        });
    } else { for (const variable of tuiElement.children) {
            variable.classList.remove('color-number');
    }
    pagination.on('afterMove', event => {
            
            for (const variable of tuiElement.children) {
            variable.classList.remove('color-number');
        }
        });
        //console.log(tuiElement.children);
    }
    };
//--------------------------------------------------------------
// changePaginationTheme();
//--------------------------------------------------------------
//FetchImages template
//  export function fetchImages(page) {
  
//         return trendingFilms.getTrendingFilms(page)
//             .then(res => ({ page: res.data.page, total_pages: res.data.total_pages, results: res.data.results, total_results: res.data.total_results }))
    
//     };
//--------------------------------------------------------------

// Возврат пагинации при клике на логотип/домашнюю страницу

const logo = document.querySelector('.logo__list').addEventListener('click', onLogoClick);
const home = document.querySelector('.home__btn').addEventListener('click', onHomeClick);

function onLogoClick() {
    document.getElementById('pagination').style.display = "block";
};

function onHomeClick() {
    document.getElementById('pagination').style.display = "block";
}; 