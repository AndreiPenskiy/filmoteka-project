import Pagination from 'tui-pagination';
import { trendingFilms } from './homepage-rendering';
import { renderMovieCard, showTrendMov} from './homepage-rendering';
import { bodyTheme } from './btn-theme';

console.log(trendingFilms);
console.log('it`s working pagination');



// export function initPagination() { 

    // console.log(paginationOptions, "paginationOptions START");

//Pagination first start with response from API and create total_pages
//
// const page = pagination.getCurrentPage();
// console.log(page);
// trendingFilms.page = page;

    // fetchImages(page).then(res => {
    // pagination.reset(res.total_results);
    // paginationOptions.totalItems = res.total_results;
    
        console.log("Here we'll make renderImages");
        // showTrendMov(event);
// });
// };

//Pagination change number of page, Fetch data and Render pages
//
// export function onPagination() {
    
//     // pagination.on('afterMove', event => {
    
//     //     // console.log(event);

//     //     const currentPage = event.page;
//     //     trendingFilms.page = currentPage;
    
//     //     // console.log(trendingFilms);

//     //     fetchImages(trendingFilms.page).then(res => {
//     //         console.log(res);
//     //         paginationOptions.totalItems = res.total_results;
//     //         paginationOptions.page = res.page;
//     //         console.log("paginationOptions = ", paginationOptions);
//     //         // showTrendMov();
//     //     });
    

//     // });
// };

 export function fetchImages(page) {
  
        return trendingFilms.getTrendingFilms(page)
            .then(res => ({ page: res.data.page, total_pages: res.data.total_pages, results: res.data.results, total_results: res.data.total_results }))
    
    };


    //Pagination change Theme day night
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
