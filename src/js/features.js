import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

const swiperElement = document.querySelector('[data-swiper]');

if (swiperElement) {
  let swiperInstance = null;

  const initSwiper = element => {
    if (window.innerWidth >= 1440 || swiperInstance) return;

    swiperInstance = new Swiper(element, {
      modules: [Autoplay],
      slidesPerView: 'auto',
      centeredSlides: false,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      watchSlidesProgress: true,
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !swiperInstance) {
          initSwiper(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -100px 0px',
    }
  );

  observer.observe(swiperElement);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1440) {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    } else {
      if (
        !swiperInstance &&
        swiperElement.getBoundingClientRect().top < window.innerHeight
      ) {
        initSwiper(swiperElement);
      }
    }
  });
}
