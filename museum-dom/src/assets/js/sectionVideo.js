import Swiper from 'swiper/bundle';
/* import 'swiper/css/bundle'; */
const videoPlayer = document.querySelector('.video__player');
const videoContent = document.querySelector('.video__content');
const videoBigPlay = document.querySelector('.video__big-play');
const videoPlay = document.querySelector('.video__play');
const videoProgress = document.querySelector('.video__progress');
const videoVolume = document.querySelector('.video__volume');
const videoVolumeLevel = document.querySelector('.video__volume-level');
const videoZoom = document.querySelector('.video__zoom');
const videoContainerContent = document.querySelector('.video__container-content');
const videoControls = document.querySelector('.video__controls');

let volumeBeforeMute;
let canAutoMoveProgress = true;
let lineProgress = 0;
let videoContentSpeed = 1.0;

const content = (e) => {
  if (e.target.classList.contains('video__content') !== false);

    if (videoContent.paused) {
      videoContent.play();
      videoBigPlay.style.display = 'none';
      videoPlay.style.backgroundImage = `url('./assets/svg/pause.svg')`;
    } else {
      videoContent.pause();
      videoBigPlay.style.display = 'inline-block';
      videoPlay.style.backgroundImage = `url('./assets/svg/play.svg')`;
    }
};

videoContent.addEventListener('click', (e) => content(e));


const nextVideoAfterEnd = () => {
  nextOrPrevVideoContent();
};

videoContent.addEventListener('ended', () => nextVideoAfterEnd());


const bigPlay = () => {
  if (videoContent.paused) {
    videoContent.play();
    videoBigPlay.style.display = 'none';
    videoPlay.style.backgroundImage = `url('./assets/svg/pause.svg')`;
  }
};

videoBigPlay.addEventListener('click', () => bigPlay());


const play = () => {
  if (videoContent.paused) {
    videoContent.play();
    videoPlay.style.backgroundImage = `url('./assets/svg/pause.svg')`;
    videoBigPlay.style.display = 'none';

  } else {
    videoContent.pause();
    videoPlay.style.backgroundImage = `url('./assets/svg/play.svg')`;
    videoBigPlay.style.display = 'inline-block';
  }
};

videoPlay.addEventListener('click', () => play());


const progress = () => {
  if (!canAutoMoveProgress) return;
  const value = videoContent.currentTime / videoContent.duration * 100;
  videoProgress.value = value;
  videoProgress.style.background = `-webkit-gradient(linear, left top, right top, from(#710707), color-stop(${value}%, #710707), color-stop(${value}%, #fff), to(#fff))`;
  videoProgress.style.background = `linear-gradient(left, #710707 0%, #710707 ${value}%, #fff ${value}%, #fff 100%)`;
};

videoContent.addEventListener('timeupdate', () => progress());


const changeProgressMousedown = () => {
  canAutoMoveProgress = false;
};

videoProgress.addEventListener('mousedown', () => changeProgressMousedown());


const changeProgressMouseup = () => {
  videoContent.currentTime = videoContent.duration * (lineProgress / 100);
  canAutoMoveProgress = true;
};

videoProgress.addEventListener('mouseup', () => changeProgressMouseup());


const changeProgressInput = () => {
  lineProgress = videoProgress.value;
  videoProgress.style.background = `-webkit-gradient(linear, left top, right top, from(#710707), color-stop(${lineProgress}%, #710707), color-stop(${lineProgress}%, #C4C4C4), to(#C4C4C4))`;
  videoProgress.style.background = `linear-gradient(left, #710707 0%, #710707 ${lineProgress}%, #C4C4C4 ${lineProgress}%, #C4C4C4 100%)`;
};

videoProgress.addEventListener('input', () => changeProgressInput());

 
const volume = () => {

  if (videoVolumeLevel.value > 0) volumeBeforeMute = videoVolumeLevel.value;

  if (videoContent.muted) {
    volumeLevel(volumeBeforeMute);
  } else {
    volumeLevel(0);
  }
};

videoVolume.addEventListener('click', () => volume());


const volumeLevel = (volumeLevel = videoVolumeLevel.value) => {
  const value = volumeLevel;
  videoContent.volume = value / 10;

  videoVolumeLevel.style.background = `-webkit-gradient(linear, left top, right top, from(#710707), color-stop(${value * 10}%, #710707), color-stop(${value * 10}%, #C4C4C4), to(#C4C4C4))`;
  videoVolumeLevel.style.background = `linear-gradient(left, #710707 0%, #710707 ${value * 10}%, #C4C4C4 ${value * 10}%, #C4C4C4 100%)`;

  if (videoContent.volume === 0) {
    videoContent.muted = true;
    videoVolumeLevel.value = volumeLevel;
    videoVolume.style.backgroundImage = 'url("./assets/svg/mute.svg")';
  } else {
    videoContent.muted = false;
    videoVolumeLevel.value = volumeLevel;
    videoVolume.style.backgroundImage = 'url("./assets/svg/volume.svg")';
  }
};

videoVolumeLevel.addEventListener('input', () => volumeLevel());


const zoom = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    videoZoom.style.backgroundImage = 'url("./assets/svg/zoom.svg")';
    videoContainerContent.style.paddingBottom = '';
    videoControls.style.position = '';
    videoControls.style.top = '';
    videoControls.style.bottom = '';
  } else {
    videoPlayer.requestFullscreen();
    videoZoom.style.backgroundImage = 'url("./assets/svg/fullscreen_exit.svg")';
    videoContainerContent.style.paddingBottom = '100vh';
    videoControls.style.position = 'absolute';
    videoControls.style.top = 'auto';
    videoControls.style.bottom = '0';
  }
};

videoZoom.addEventListener('click', () => zoom());


document.addEventListener('fullscreenchange', (e) => {
  if (!document.fullscreenElement) {
    videoZoom.style.backgroundImage = 'url("./assets/svg/zoom.svg")';
    videoContainerContent.style.paddingBottom = '';
    videoControls.style.position = '';
    videoControls.style.top = '';
    videoControls.style.bottom = '';
  }
  if (document.fullscreenElement) {
  }
})


const videoContentSpeedDown = () => {
  if (videoContent.playbackRate <= 0.25) return;
  videoContent.playbackRate = videoContentSpeed -= 0.25;
};

const videoContentSpeedUp = () => {
  if (videoContent.playbackRate >= 2) return;
  videoContent.playbackRate = videoContentSpeed += 0.25;
};

const nextOrPrevVideoContent = (index = 0) => {
  let valueSrc = videoContent.getAttribute('src');
  valueSrc = valueSrc.split('.');
  let num = +valueSrc[1][valueSrc[1].length - 1];
  num = num + index;

  if (num > 4) num = 0;
  if (num < 0) num = 4;

  valueSrc[1] = valueSrc[1].slice(0, -1) + num;
  valueSrc = valueSrc.join('.');
  videoContent.setAttribute('src', valueSrc);

  // Плавный переход видео
  let tagVideo = document.createElement('video');
  let valueTagVideo = videoContent.getAttribute('poster');
  tagVideo.setAttribute('poster', valueTagVideo);
  tagVideo.classList.add('video__content', 'video__content--opacity');
  videoPlayer.append(tagVideo);
  setTimeout(() => {
    tagVideo.remove();
  }, 300);

  let valuePoster = videoContent.getAttribute('poster');
  valuePoster = valuePoster.split('.');
  valuePoster[1] = valuePoster[1].slice(0, -1) + num;
  valuePoster = valuePoster.join('.');
  videoContent.setAttribute('poster', valuePoster);

  videoBigPlay.style.display = 'inline-block';

  setTimeout(() => {
    videoProgress.value = 0;
    videoProgress.style.background = `-webkit-gradient(linear, left top, right top, from(#710707), color-stop(${0}%, #710707), color-stop(${0}%, #fff), to(#fff))`;
    videoProgress.style.background = `linear-gradient(left, #710707 0%, #710707 ${0}%, #fff ${0}%, #fff 100%)`;
    videoPlay.style.backgroundImage = `url('./assets/svg/play.svg')`;
    videoBigPlay.style.display = 'inline-block';
}, 0);
};


const checkHotkeys = (e) => {
  let canClickHotKeys = videoControls.classList.contains('data-hotkeys-blocked');
  if (canClickHotKeys) return;

  switch (e.code) {
    case 'Space':
      play();
      if (e.target === document.body) e.preventDefault();
      break;

    case 'KeyM':
      volume();
      break;

    case 'Comma':
      if (!e.shiftKey) return;
      videoContentSpeedUp();
      break;

    case 'Period':
      if (!e.shiftKey) return;
      videoContentSpeedDown();
      break;
      
    case 'KeyF':
      zoom();
      break;

    case 'KeyK':
      play();
      break;

    case 'KeyJ':
      videoContent.currentTime -= 10;
      break;

    case 'KeyL':
      videoContent.currentTime += 10;
      break;

    case 'KeyN':
      nextOrPrevVideoContent(1);
      break;

    case 'KeyP':
      nextOrPrevVideoContent(-1);
      break;

    case 'Escape':
      console.log('123');
      break;

    default:
      break;
  }
};

document.addEventListener('keydown', (e) => checkHotkeys(e));


// TODO: удалить на Stage 1
/* const videoButtonPrev = document.querySelector('.video__buttonPrev');
videoButtonPrev.addEventListener('click', () => nextOrPrevVideoContent(-1));
const videoButtonNext = document.querySelector('.video__buttonNext');
videoButtonNext.addEventListener('click', () => nextOrPrevVideoContent(1)); */

const swiper = new Swiper('.video__swiper', {
  speed: 400,
  spaceBetween: 42,
  loop: true,
  slidesPerView: 3,
  loopedSlides: 5,
});

let timeout = false;
const videoPagination = document.querySelector('.video__pagination');

const clickVideoPagination = (e) => {
  if (e.target.classList.contains('pagination__button-prev')) {
    swiper.slidePrev();
    nextOrPrevVideoContent(-1);
  }
 /*  if (e.target.classList.contains('pagination__num0')) swiper.slideTo(1);
  if (e.target.classList.contains('pagination__num1')) swiper.slideTo(2);
  if (e.target.classList.contains('pagination__num2')) swiper.slideTo(3);
  if (e.target.classList.contains('pagination__num3')) swiper.slideTo(4);
  if (e.target.classList.contains('pagination__num4')) swiper.slideTo(5); */
  if (e.target.classList.contains('pagination__button-next')) {
    swiper.slideNext();
    if (!timeout) {
      timeout = true;
      nextOrPrevVideoContent(1);
      setTimeout(() => {
        timeout = false;
      }, 400);
    }
  }
};
videoPagination.addEventListener('click', (e) => clickVideoPagination(e));

const addActiveStyle = () => {
  for (let button of videoPagination.children) {
    if (button.classList.contains(`pagination__num${swiper.realIndex}`)) {
      button.classList.add(`pagination__num--active`);
    } else {
      button.classList.remove(`pagination__num--active`);
    }
  }
}

swiper.on('slideChange', () => addActiveStyle());
swiper.on('click', () => console.log('123'));