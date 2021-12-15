const btnThemeHeader = document.querySelector('#theme-check');
const bodyTheme = document.querySelector('body');
const checked = document.querySelector('.lyf')
let theme = localStorage.getItem("ui-theme");

window.addEventListener('load', saveTheme);
btnThemeHeader.addEventListener('click', onTheme);

function saveTheme () {
    if (theme === "dark") {
        bodyTheme.classList.add('body-theme');
        checked.setAttribute('checked', true);
    };
};

function onTheme() {
    theme = localStorage.getItem("ui-theme");
    
    if (theme === "dark") {
        bodyTheme.classList.remove('body-theme');
        localStorage.setItem("ui-theme", "light");
        return
    };

    bodyTheme.classList.add('body-theme');
    localStorage.setItem("ui-theme", "dark");
};


