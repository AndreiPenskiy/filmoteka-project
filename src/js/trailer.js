import * as basicLightbox from 'basiclightbox';
import axios from 'axios';

let trailer;
const mainContainer = document.querySelector('.container__main');

export default function onTrailerClick() {
  mainContainer.addEventListener('click', watchTrailer);
}

///// Click event listener /////
function watchTrailer(e) {
  e.preventDefault();
  if (e.target.closest('.card__link')?.querySelector('card__poster') === undefined) {
    return;
  }

  fetchTrailer(e.target.closest('.card__link').id)
    .then(renderTrailer)
    .catch(error => {
      console.log(error);
    });
}

///// Fetch movie by ID /////
function fetchTrailer(filmID, lang) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${filmID}/videos?api_key=daf1fe8995a61d2fecc007eaa464ca98&language=${lang}`,
    )
    .then(response => response.data)
    .then(data => {
      return data.results;
    });
}

///// Render trailer modal /////

function renderTrailer(data) {
  let key = '';
  data.forEach(obj => {
    if (obj.name.includes('Official')) {
      key = obj.key;
    }
  });

  creatTrailerLink(key);

  // Close trailer by Escape
  window.addEventListener('keydown', closeTrailerByEsc);
  function closeTrailerByEsc(e) {
    if (e.code === 'Escape') {
      trailer.close();
      window.removeEventListener('keydown', closeTrailerByEsc);
    }
  }
}

function creatTrailerLink(key) {
  trailer = basicLightbox.create(`
    <iframe width="320" height="240" src='https://www.youtube.com/embed/${key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>
  `);

  setTimeout(() => {
    const trailerBtn = document.querySelector('.modal-movie__img');
    trailerBtn.addEventListener('click', showTrailer);
  }, 300);

  function showTrailer() {
    trailer.show();
  }
}
