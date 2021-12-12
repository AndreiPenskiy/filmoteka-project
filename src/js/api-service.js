import axios from 'axios';

export default class filmsAPIService {
  constructor() {
    this.currentPage = 1; // можна використовувати для пагінації
    this.lang = 'uk';
    this.allGenres = [];
  }

  getTrendingFilms() {
    return axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=daf1fe8995a61d2fecc007eaa464ca98&page=${this.currentPage}&language=${this.lang}`,
    );
  }

  getFilmsByQuery(query) {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=daf1fe8995a61d2fecc007eaa464ca98&query=${query}&page=${this.currentPage}&include_adult=false&language=${this.lang}`,
    );
  }

  getSingleFilmByID(filmID) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}?api_key=daf1fe8995a61d2fecc007eaa464ca98&language=${this.lang}`,
    );
  }

  getGenres() {
    return axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=daf1fe8995a61d2fecc007eaa464ca98&language=${this.lang}`,
    );
  }

  async getAllGenres() {
    const genres = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=daf1fe8995a61d2fecc007eaa464ca98&language=${this.lang}`,
    );
    this.allGenres.push(...genres.data.genres);
  }

  get page() {
    return this.currentPage;
  }

  set page(pageNumber) {
    this.currentPage = pageNumber;
  }

  get language() {
    return this.lang;
  }

  set language(userLang) {
    this.lang = userLang;
  }
}
