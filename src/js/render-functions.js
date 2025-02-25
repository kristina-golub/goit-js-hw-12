import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function renderGallery(images) {
  const markup = images
    .map(
      (image) => `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="info">
        <p><span class="info-label">Likes</span> <span class="info-value">${image.likes}</span></p>
        <p><span class="info-label">Views</span> <span class="info-value">${image.views}</span></p>
        <p><span class="info-label">Comments</span> <span class="info-value">${image.comments}</span></p>
        <p><span class="info-label">Downloads</span> <span class="info-value">${image.downloads}</span></p>
      </div>
    </a>
  `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function getGalleryItemHeight() {
  const item = document.querySelector('.gallery-item');
  return item ? item.getBoundingClientRect().height : 0;
}
