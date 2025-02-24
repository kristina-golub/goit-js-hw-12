import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); 

if (!form || !gallery || !loader) {
    console.error("not found");
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = event.target.elements['search-input'].value.trim();

    if (!query) {
        iziToast.error({ message: 'Введіть запит!' });
        return;
    }

    gallery.innerHTML = '';  
    loader.classList.remove('hidden');  

    try {
        const images = await fetchImages(query);

        console.log('Fetched images:', images); 

        if (images.length === 0) {
            iziToast.error({ message: 'Sorry, there are no images matching your search query. Please try again!' });
        } else {
            renderGallery(images); 
            new SimpleLightbox('.gallery a'); 
        }
    } catch (error) {
        console.error('Error during fetching:', error);
        iziToast.error({ message: 'Sorry, there was an error fetching images. Please try again!' });
    } finally {
        loader.classList.add('hidden');  
    }
});
