export const RENDER_IMAGES_NUMBERS = 20
import { RENDER_IMAGES_NUMBERS } from "./js/fetchImages";

if (totalImages <= RENDER_IMAGES_NUMBERS) {
    return
}
showButton(refs.loadMoreButton);


function markupGallery(images) {
  const markup = images
    .map(image => {
      return `
    <li class="card__item">
        <a class="card__link" href="#">
            <picture class="card__poster">
                <source media="(min-width: 1024px)"
                    srcset=" ${image._______} ./images/main-cards/poster.jpg 1x, ${image._______} ./images/main-cards/poster@2x.jpg 2x">

                <source media="(min-width: 768px)"
                    srcset="${image._______} ./images/main-cards/poster-tab.jpg 1x, ${image._______} ./images/main-cards/poster-tab@2x.jpg 2x">

                <source media="(min-width: 320px)"
                    srcset="${image._______} ./images/main-cards/poster-mob.jpg 1x, ${image._______} ./images/main-cards/poster-mob@2x.jpg 2x">

                <img class="picture" src="${image._______} ./images/main-cards/poster.jpg" alt="${image._______}">
            </picture>
            <h2 class="card__title">greyhound</h2>
            <p class="card__description">Drama, Action | 2020</p>
            <p class="card__rating">10.0</p>
        </a>
    </li>`;
    })
    .join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}
 
    //  loading="lazy" ???

    // <a class="gallery__item" href="${image.largeImageURL}">
    //       <div class="photo-card">
    //         <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    //         <div class="info">
    //           <p class="info-item">
    //             <b>Likes</b>
    //             ${image.likes}
    //           </p>
    //           <p class="info-item">
    //             <b>Views</b>
    //             ${image.views}
    //           </p>
    //           <p class="info-item">
    //             <b>Comments</b>
    //             ${image.comments}
    //           </p>
    //           <p class="info-item">
    //             <b>Downloads</b>
    //             ${image.downloads}
    //           </p>
    //         </div>
    //       </div>
    //     </a>
