import Pagination from 'tui-pagination';
import { trendingFilms } from './homepage-rendering';
import './homepage-rendering';
import { bodyTheme } from './btn-theme';

console.log(trendingFilms);
console.log('it`s working pagination');

// export const trendingFilms = new filmsAPIService();


export const paginationOptions = {
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

console.log(paginationOptions, "paginationOptions START");


export var pagination = new Pagination('pagination', paginationOptions);


//Pagination first start with response from API and create total_pages
//
const page = pagination.getCurrentPage();
console.log(page);

fetchImages(page).then(res => {
    pagination.reset(res.total_results);
    paginationOptions.totalItems = res.total_results;
    showTrendMov(event);
    console.log("Here we'll make renderImages");
});


//Pagination change number of page, Fetch data and Render pages
//
pagination.on('afterMove', event => {
    
    console.log(event);

    const currentPage = event.page;
    trendingFilms.page = currentPage;
    
    console.log(trendingFilms);

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
    
// console.log("res.data =", res.data.total_results)

export function changePaginationTheme(paginationOptions) {
    if (bodyTheme.className === 'body-theme') {
        
        console.log("paginationOptions", paginationOptions);
        
        
    } else {
        console.log("paginationOptions", paginationOptions);
        
     };   
};

function renderImages(images) {
  console.log('RENDER');
  console.log(images);
};
