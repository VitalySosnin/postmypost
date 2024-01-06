'use strict';

(() => {
  const elHtml = document.querySelector('html');
  const elBody = document.querySelector('body');

  initMainMenu();
  initDelayedAnimation();
  initSwiper();

  function initMainMenu() {
    if (!elHtml || !elBody) return;

    const targetMenuClass = 'show-mobile-menu';
    const targetSubMenuClass = 'show-mobile-submenu';

    elBody.addEventListener('click', (e) => {
      let elTarget = e.target.closest('[data-main_menu_hide]');

      if (elTarget) {
        const classList = [targetMenuClass];

        elHtml.classList.forEach((item) => {
          item.includes(targetSubMenuClass) && classList.push(item);
        });

        elHtml.classList.remove(...classList);
        return;
      }

      elTarget = e.target.closest('[data-main_submenu_hide]');

      if (elTarget) {
        const classList = [];

        elHtml.classList.forEach((item) => {
          item.includes(targetSubMenuClass) && classList.push(item);
        });

        if (classList.length) {
          elHtml.classList.remove(...classList);
          return;
        }
      }

      elTarget = e.target.closest('[data-main_menu_toggle]');

      if (elTarget) {
        elHtml.classList.toggle(targetMenuClass);
        return;
      }

      elTarget = e.target.closest('[data-main_submenu_show]');

      if (elTarget) {
        elHtml.classList.add(targetMenuClass, targetSubMenuClass, `${targetSubMenuClass}--${elTarget.getAttribute('data-main_submenu_show')}`);
      }
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
    new Swiper('.swiper-common', {
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

    new Swiper('.swiper-tools', {
      slidesPerView: 1,
      spaceBetween: 16,
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

    new Swiper('.swiper-reviews', {
      slidesPerView: 1,
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
})();
