import Pagination from 'tui-pagination';


console.log('it`s working pagination');


const paginationOptions = {
    totalItemsValue:500,
    itemsPerPageValue:20,
    visiblePagesValue: 5,
};

const { totalItemsValue, itemsPerPageValue, visiblePagesValue } = paginationOptions;


const paginationObj = {
    totalItems: `${totalItemsValue}`,
    itemsPerPage: `${itemsPerPageValue}`,
    visiblePages: `${visiblePagesValue}`,
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
};

var pagination = new Pagination('pagination', paginationObj);


//----------------------------------------------------------------------------
//Selected Page in pagination block
const paginationBlock = document.querySelector(".tui-pagination");

const takePageNumber = (event) => {

    const takeSelectedNumber = document.querySelector(".tui-is-selected");

if (event.target.className.includes("tui-page-btn tui-is-disabled tui-prev custom-class-prev") || event.target.className.includes("tui-page-btn tui-is-disabled tui-next custom-class-next")) {
    console.log(event.target.parentNode.className);
    return;
        }

 if ((event.target.className.includes("tui-ico-prev") && event.target.parentNode.className.includes("tui-page-btn tui-is-disabled tui-prev custom-class-prev")) || (event.target.className.includes("tui-ico-next") && event.target.parentNode.className.includes("tui-page-btn tui-is-disabled tui-next custom-class-next"))) {
     console.log(event.target.parentNode.className);   
     return;
        }
    
    console.log(Number(takeSelectedNumber.textContent));
    return  Number(takeSelectedNumber.textContent);
};

let clickedPage = paginationBlock.addEventListener('click', takePageNumber);
if (clickedPage !== undefined) {
    console.log(clickedPage);
}