import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = 'key=24406479-58af1b59940bc123ae2a55678';
const PER_PAGE = 40;
const searchOption = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

export default class Api {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImg() {
    const url = `${BASE_URL}?${KEY}&q=${this.searchQuery}&per_page=${this.pageSize}&page=${this.page}&${searchOption}`;
    const { data } = await axios.get(url);
    this.page += 1;

    return {
      data,
      hasNextPage: this.page <= data.totalHits / PER_PAGE,
    };
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
