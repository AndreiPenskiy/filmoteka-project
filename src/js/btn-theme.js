const btnThemeHeader = document.querySelector('#theme-check')
const bodyTheme = document.querySelector('body');
const tuiBtn = document.querySelectorAll('.tui-page-btn')
const filmNameTheme = document.querySelectorAll('.card__link')


btnThemeHeader.addEventListener('click', onTheme);

function onTheme (e) {
    bodyTheme.classList.toggle('body-theme')
    const tuiBtnColor = tuiBtn.forEach(item  => {
        item.classList.toggle('color-number')
    })
    const filmNameColor = filmNameTheme.forEach(pes => {
        pes.classList.toggle('color-number')
    })
}