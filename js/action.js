'use strict';

(() => {
  initMainMenu();
  initDelayedAnimation();
  initSwiper();

  const elHtml = document.querySelector('html');

  function initMainMenu() {
    const targetMenuClass = 'show-mobile-menu';
    const targetSubMenuClass = 'show-mobile-submenu';

    document.querySelectorAll('[data-main_submenu_hide]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const classList = [];

        elHtml?.classList.forEach((item) => {
          item.includes(targetSubMenuClass) && classList.push(item);
        });

        if (classList.length) {
          elHtml?.classList.remove(...classList);
          e.stopImmediatePropagation();
        }
      });
    });

    document.querySelectorAll('[data-main_menu_toggle]').forEach((el) => {
      el.addEventListener('click', () => {
        elHtml?.classList.toggle(targetMenuClass);
      });
    });

    document.querySelectorAll('[data-main_submenu_show]').forEach((el) => {
      el.addEventListener('click', () => {
        elHtml?.classList.add(targetSubMenuClass, `${targetSubMenuClass}--${el.getAttribute('data-main_submenu_show')}`);
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
          slidesPerView: 0,
          spaceBetween: 0
        }
      }
    });
  }
})();
