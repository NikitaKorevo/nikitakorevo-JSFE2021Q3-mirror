import Swiper from 'swiper/bundle';
/* import 'swiper/css/bundle'; */

const swiper = new Swiper('.welcome__swiper', {
  speed: 400,
  spaceBetween: 0,
  loop: true,
});

const control = document.querySelector('.welcome__control');

const clickControl = (e) => {
  if (e.target.classList.contains('control__prev')) swiper.slidePrev();
  if (e.target.classList.contains('control__next')) swiper.slideNext();
  if (e.target.classList.contains('control__square0')) swiper.slideTo(1);
  if (e.target.classList.contains('control__square1')) swiper.slideTo(2);
  if (e.target.classList.contains('control__square2')) swiper.slideTo(3);
  if (e.target.classList.contains('control__square3')) swiper.slideTo(4);
  if (e.target.classList.contains('control__square4')) swiper.slideTo(5);
}
control.addEventListener('click', (e) => clickControl(e))

const addActiveStyle = () => {
  for (let button of control.children) {
    if (button.classList.contains(`control__square${swiper.realIndex}`)) {
      button.classList.add(`control__square--active`);
    } else {
      button.classList.remove(`control__square--active`);
    }
    if (button.classList.contains('control__count')) {
      button.textContent = `0${swiper.realIndex + 1} | 05`;
    }
  }
}

swiper.on('slideChange', () => addActiveStyle());