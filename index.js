import galleryItems from './js/gallery-items.js';

const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightbox: document.querySelector('.js-lightbox'),
  backdrop: document.querySelector('.lightbox__content'),
  largeImage: document.querySelector('.lightbox__image'),
};

const createMarkup = ({ preview, original, descrition }) =>
  `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${descrition}
    />
  </a>
</li>`;

const createGallery = galleryItems =>
  galleryItems.map(item => createMarkup(item)).join('');

refs.galleryRef.insertAdjacentHTML('afterbegin', createGallery(galleryItems));

refs.galleryRef.addEventListener('click', onOpenHandler);
refs.closeModalBtn.addEventListener('click', onCloseHandler);
refs.backdrop.addEventListener('click', onBackdropCloseHandler);

function onOpenHandler(event) {
  event.preventDefault();
  window.addEventListener('keydown', onEscapePressHandler);
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  if (imageRef.nodeName === 'IMG') {
    refs.lightbox.classList.add('is-open');
    refs.largeImage.src = largeImageURL;
  }
}

function onCloseHandler() {
  window.removeEventListener('keydown', onEscapePressHandler);
  refs.lightbox.classList.remove('is-open');
  refs.largeImage.src = '';
}

function onBackdropCloseHandler(event) {
  if (event.target === event.currentTarget) {
    onCloseHandler();
  }
}

function onEscapePressHandler(event) {
  if (event.code === 'Escape') {
    onCloseHandler();
  }
}
