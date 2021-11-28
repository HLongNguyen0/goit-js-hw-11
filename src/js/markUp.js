export function markUp(cards) {
  return cards.map(cardMurcup).join('');
}
function cardMurcup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
<div class="photo-card">
  <a class="link" href="${largeImageURL}">
    <div class="img-wrapper">
      <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </div>
    <div class="info">
      <p class="info__item">
        likes
        <b>${likes}</b>
      </p>
      <p class="info__item">
        views
        <b>${views}</b>
      </p>
      <p class="info__item">
        comments
        <b>${comments}</b>
      </p>
      <p class="info__item info__item--last">
        downloads
        <b>${downloads}</b>
      </p>
    </div>
  </a>
</div>
`;
}
