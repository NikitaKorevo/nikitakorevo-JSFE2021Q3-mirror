import playLIst from './playList';

const elPlayList = document.querySelector('.play-list');
const elPlayPrev = document.querySelector('.play-prev');
const elPlay = document.querySelector('.play');
const elPlayNext = document.querySelector('.play-next');
const audio = document.createElement('audio');
let isPlay = false;
let playNum = 0;


playLIst.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  elPlayList.append(li);
});

const playAudio = () => {
  if (elPlay.classList.contains('pause')) {
    elPlay.classList.remove('pause');
    audio.pause();
  } else {
    elPlay.classList.add('pause');
    audio.src = playLIst[playNum].src;
    audio.play();
  }
};
elPlay.addEventListener('click', () => playAudio());

const playPrev = () => {
  playNum--;
  if (playNum < 0) playNum = playLIst.length - 1;
  elPlay.classList.add('pause');
  audio.src = playLIst[playNum].src;
  audio.play();
  console.log(playNum);
  addStyle();
};
elPlayPrev.addEventListener('click', () => playPrev());

const playNext = () => {
  playNum++;
  if (playNum >= playLIst.length) playNum = 0;
  elPlay.classList.add('pause');
  audio.src = playLIst[playNum].src;
  audio.play();
  console.log(playNum);
  addStyle();
};
elPlayNext.addEventListener('click', () => playNext());

const endedAudio = () => {
  playNext();
};
audio.addEventListener('ended', () => endedAudio())

const addStyle = () => {
  for (let i = 0; i < elPlayList.children.length; i++) {
    if (i === playNum) {
      elPlayList.children[i].classList.add('item-active');
    } else {
      elPlayList.children[i].classList.remove('item-active');
    }
  }
};
