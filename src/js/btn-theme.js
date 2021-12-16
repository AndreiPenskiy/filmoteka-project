import { changePaginationTheme } from './pagination';
const btnThemeHeader = document.querySelector('#theme-check');
const bodyTheme = document.querySelector('body');
// const tuiBtn = document.querySelectorAll('.tui-page-btn');
// const filmNameTheme = document.querySelectorAll('.card__link');

const checked = document.querySelector('.lyf')
window.addEventListener('load', saveTheme);

btnThemeHeader.addEventListener('click', onTheme);

let theme = localStorage.getItem("ui-theme");

function saveTheme () {
    if (theme === "dark") {
        bodyTheme.classList.add('body-theme');
        checked.setAttribute('checked', true);
        // changePaginationTheme();
        setTimeout(changePaginationTheme, 500);
    };
};

function onTheme() {
    theme = localStorage.getItem("ui-theme");
    
    if (theme === "dark") {
        bodyTheme.classList.remove('body-theme');
        localStorage.setItem("ui-theme", "light");
        // changePaginationTheme();
        setTimeout(changePaginationTheme, 100);
        return
    };
    bodyTheme.classList.add('body-theme');
    localStorage.setItem("ui-theme", "dark");
    // changePaginationTheme();
    setTimeout(changePaginationTheme, 100);
};

// function onTheme(e) {
//     bodyTheme.classList.toggle('body-theme')
//     const tuiBtnColor = tuiBtn.forEach(item  => {
//         item.classList.toggle('color-number')
//     })
//     const filmNameColor = filmNameTheme.forEach(pes => {
//         pes.classList.toggle('color-number')
//     })
// }

