import Api from './js/apiService';
import { markUp } from './js/markUp';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = null;
const searchServise = new Api();

const refs = {
  form: document.querySelector('.search-form'),
  searchQuery: document.querySelector('.search-form__input'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearchInput);
refs.loadMore.addEventListener('click', onLoadContent);
async function onSearchInput(event) {
  event.preventDefault();
  searchServise.page = 1;
  refs.gallery.innerHTML = '';
  const newQuery = event.target.elements.searchQuery.value.trim();
  searchServise.query = newQuery;
  if (newQuery === '') {
    return;
  }
  onLoadModeBtn();
  const cards = await parceImgCard();
  refs.gallery.insertAdjacentHTML('beforeend', markUp(cards));
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  }
  onMainModeBtn();
}
async function onLoadContent() {
  const cards = await parceImgCard();
  refs.gallery.insertAdjacentHTML('beforeend', markUp(cards));
  lightbox = new SimpleLightbox('.gallery a');
}
function parceImgCard() {
  return searchServise
    .getImg()
    .then(checkHits)
    .catch(({ message }) => {
      refs.loadMore.classList.add('is-hidden');
      return Notify.failure(message);
    });
}
function checkHits(res) {
  const { data, hasNextPage } = res;
  if (data.hits.length !== 0) {
    return data.hits;
  }
  if (!hasNextPage && data.totalHits > 0) {
    throw Error('No more pictures');
  }
  throw Error('No such pictures');
}

function onLoadModeBtn() {
  refs.loadMore.textContent = 'loading...';
  refs.loadMore.setAttribute('disabled', true);
  refs.loadMore.classList.remove('is-hidden');
}
function onMainModeBtn() {
  refs.loadMore.textContent = 'Load more';
  refs.loadMore.removeAttribute('disabled');
}
