const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active'); 
    menuLinks.classList.toggle('active'); 
})

document.addEventListener('DOMContentLoaded', () => {
  // Hero section slideshow (crossfade between layered backgrounds)
  const mainContainer = document.querySelector('.main__container');
  if (mainContainer) {
    // Different image sets for different pages
    let images;
    if (window.location.pathname.includes('experience.html')) {
      // Experience page images
      images = [
        '../images/experience_1.jpg',
        '../images/experience_2.jpg',
        '../images/experience_3.jpg',
        '../images/experience_4.jpg'
      ];
    } else {
      // Home page images
      images = [
        '../images/mtl_1.jpg',
        '../images/mtl_2.jpg',
        '../images/mtl_3.jpg',
        '../images/mtl_4.jpg'
      ];
    }

    // Preload images
    images.forEach((src) => { const img = new Image(); img.src = src; });

    let currentIndex = 0;     // index of the image currently visible
    let showingAlt = false;   // whether ::after layer is the visible one

    // Initialize both layers
    mainContainer.style.setProperty('--bg-image-1', `url('${images[0]}')`);
    mainContainer.style.setProperty('--bg-image-2', `url('${images[1]}')`);

    function crossfade() {
      // Toggle which layer is visible (CSS handles the fade)
      showingAlt = !showingAlt;
      mainContainer.classList.toggle('show-alt', showingAlt);

      // After fade completes, advance index and prepare the hidden layer
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length; // now-visible image index
        const nextIndex = (currentIndex + 1) % images.length; // image to load next into hidden layer
        const nextUrl = `url('${images[nextIndex]}')`;
        if (showingAlt) {
          // ::after is visible → update ::before (hidden) for next cycle
          mainContainer.style.setProperty('--bg-image-1', nextUrl);
        } else {
          // ::before is visible → update ::after (hidden) for next cycle
          mainContainer.style.setProperty('--bg-image-2', nextUrl);
        }
      }, 1000); // match CSS transition duration
    }

    // Change image every 3 seconds
    setInterval(crossfade, 3000);
  }

  const boxes = document.querySelectorAll('.services__info-box');
  const heading = document.querySelector('.services h1');
  const paragraph = document.querySelector('.services p');
  const experienceImages = document.querySelectorAll('.experience__img');
  const servicesCards = document.querySelectorAll('.services__card');

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function checkVisibility() {
    boxes.forEach(box => {
      if (isInViewport(box)) {
        box.classList.add('visible');
      }
    });

    if (heading && isInViewport(heading)) {
      heading.classList.add('visible');
    }

    if (paragraph && isInViewport(paragraph)) {
      paragraph.classList.add('visible');
    }

    experienceImages.forEach((img, index) => {
      if (isInViewport(img)) {
        // Add staggered delay for each image
        setTimeout(() => {
          img.classList.add('visible');
        }, index * 200); // 200ms delay between each image
      }
    });

    // Note: Contact page services cards use CSS-only animation
    // Only apply JavaScript animation to main page cards (DNA section)
    if (window.location.pathname !== '/contact.html' && window.location.pathname !== '/contact') {
      servicesCards.forEach((card, index) => {
        if (isInViewport(card)) {
          // Add staggered delay for each card
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 200); // 200ms delay between each card
        }
      });
    }
  }

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);

  // Initial check
  checkVisibility();

  // Contact page: toggle services card details on button click
  const contactCards = document.querySelectorAll('.services__card');
  contactCards.forEach((card) => {
    const toggleButton = card.querySelector('button');
    const detailsOverlay = card.querySelector('.services__details');
    if (toggleButton) {
      toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        card.classList.toggle('active');
      });
    }
    if (detailsOverlay) {
      // When active, clicking the overlay closes (returns to initial state)
      detailsOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        if (card.classList.contains('active')) {
          card.classList.remove('active');
        }
      });
    }
  });
});

