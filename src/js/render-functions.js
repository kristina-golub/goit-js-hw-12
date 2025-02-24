import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

export function renderGallery(images) {
  gallery.innerHTML = ""; 

  if (images.length === 0) {
    return;
  }

  const markup = images
    .map(
      (image) => `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="info">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    </a>
  `
    )
    .join("");

  gallery.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery a'); 
  lightbox.refresh(); 
}
