import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

const swiper = new Swiper('[data-swiper]', {
  modules: [Autoplay],

  slidesPerView: 'auto',
  spaceBetween: 10,
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 2500,
  },

  breakpoints: {
    1440: {
      enabled: false,
    },
  },
});
