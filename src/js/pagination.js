import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// var pagination = new Pagination(document.getElementById('pagination'), {
//         totalItems: 500,
//         itemsPerPage: 10,
//         visiblePages: 5,
//         centerAlign: true
// });
    
console.log('it`s working pagination');

var pagination = new Pagination('pagination', {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    page: 1,

        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
                    '<span class="tui-ico-ellip"></span>' +
                '</a>',
        }
    });
    
