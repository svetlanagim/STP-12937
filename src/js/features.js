import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

const swiperElement = document.querySelector('[data-swiper]');

if (swiperElement) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const swiper = new Swiper(entry.target, {
            modules: [Autoplay],
            slidesPerView: 'auto',
            loop: true,
            speed: 2000,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
            },
            watchSlidesProgress: true,
            breakpoints: {
              1440: {
                enabled: false,
              },
            },
          });

          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -100px 0px',
    }
  );

  observer.observe(swiperElement);
}
