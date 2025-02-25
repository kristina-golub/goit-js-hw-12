import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery, getGalleryItemHeight } from './js/render-functions.js';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 40; 
let totalHits = 0; 

if (!form || !gallery || !loader || !loadMoreBtn) {
    console.error("One or more elements not found!");
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = event.target.elements['search-input'].value.trim();
    
    if (!query) {
        iziToast.error({ message: 'Введіть запит!' });
        return;
    }

    page = 1;  
    clearGallery();
    loader.classList.remove('hidden');
    loadMoreBtn.classList.add('hidden');

    try {
        const { images, total } = await fetchImages(query, page, perPage);
        totalHits = total;  

        if (images.length === 0) {
            iziToast.error({ message: 'Sorry, no images found. Try again!' });
        } else {
            renderGallery(images);
            if (totalHits > perPage) {
                loadMoreBtn.classList.remove('hidden');
            }
        }
    } catch (error) {
        iziToast.error({ message: 'Error fetching images. Try again!' });
    } finally {
        loader.classList.add('hidden');
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page++;
    loader.classList.remove('hidden');

    try {
        const { images } = await fetchImages(query, page, perPage);
        renderGallery(images);
        smoothScroll();

        const displayedImages = document.querySelectorAll('.gallery-item').length;
        if (displayedImages >= totalHits) {
            loadMoreBtn.classList.add('hidden');
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        }
    } catch (error) {
        iziToast.error({ message: 'Error fetching images. Try again!' });
    } finally {
        loader.classList.add('hidden');
    }
});

function smoothScroll() {
    const cardHeight = getGalleryItemHeight();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
}
