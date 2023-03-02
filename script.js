'use strict';

/* Lazy Loading Images */

// Elements
const targetElements = document.querySelectorAll('img[data-src]');

// Print the current image size
const printImageSize = function () {
    const sizeText = this.previousElementSibling.querySelector('.c-section__size');
    const {naturalWidth, naturalHeight} = this;
    sizeText.textContent = `${naturalWidth} x ${naturalHeight} ${naturalWidth > 500 ? '👍' : '👎'}`;
}

// Load image
const loadImage = (entries, observer) => {
    // Objects that represent the intersection changes that occurred.
    const entry = entries.at(0);

    // Guard clause
    if (!entry.isIntersecting) return;

    // When the target element is intersecting:
    
    // Set the new image source
    const img = entry.target;
    img.src = img.dataset.src;

    // Remove the blur class
    img.addEventListener('load', () => img.classList.remove('c-section__img--blur'));

    // Stop observing the target element (better performance)
    observer.unobserve(img);

    // Debug
    console.clear();
    console.log('Target element:', img);
    console.log('Intersection ratio:', entry.intersectionRatio.toFixed(2));
    console.log('Is intersecting?', entry.isIntersecting);
};

// Intersection observer
const observer = new IntersectionObserver(loadImage, { threshold: 0.4 });

// Target elements
targetElements.forEach(img => {
    // Add a blur class
    img.classList.add('c-section__img--blur');

    // Observe the target element
    observer.observe(img);

    // Get current size
    img.addEventListener('load', printImageSize.bind(img));
});
