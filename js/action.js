'use strict';

(() => {
  initMainMenu();
  initDelayedAnimation();
  initSwiper();

  const elHtml = document.querySelector('html');

  function initMainMenu() {
    document.querySelectorAll('[data-main_menu_toggle]').forEach((el) => {
      el.addEventListener('click', () => {
        elHtml?.classList.toggle('show-mobile-menu');
      });
    });
  }

  function initDelayedAnimation() {
    const targetClass = 'delayed-animation';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add(targetClass + '-start');
      });
    }, {rootMargin: '0px 0px -50% 0px'});

    document.querySelectorAll('.' + targetClass).forEach((el) => {
      el.classList.remove(targetClass + '-start');
      observer.observe(el);
    });
  }

  function initSwiper() {
    new Swiper('.swiper-possibilities, .swiper-how', {
      slidesPerView: 1,
      spaceBetween: -24,
      pagination: {
        el: '.swiper-pagination',
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 0
        }
      }
    });
  }
})();
