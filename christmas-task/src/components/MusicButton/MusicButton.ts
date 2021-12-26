import ChristmasTree from '../../pages/Main/ChristmasTree';
import './MusicButton.scss';

class MusicButton {
  musicButton: HTMLButtonElement;
  #audio: HTMLAudioElement;

  constructor() {
    this.musicButton = document.createElement('button');
    this.musicButton.classList.add('music-button');

    this.#audio = document.createElement('audio');
    this.#audio.src = './assets/audio/audio.mp3';
    this.#audio.volume = 0.4;
    this.#audio.addEventListener('ended', () => this.audioEnded());
    this.musicButton.addEventListener('click', () => this.playOrPauseAudio());
  }

  playOrPauseAudio(): void {
    if (this.#audio.paused) {
      this.#audio.play();
      this.musicButton.classList.add('music-button--active');
      ChristmasTree.settingsChristmasTree.isMusicPlaying = true;
      ChristmasTree.settingsChange();
    } else {
      this.#audio.pause();
      this.musicButton.classList.remove('music-button--active');
      ChristmasTree.settingsChristmasTree.isMusicPlaying = false;
      ChristmasTree.settingsChange();
    }
  }

  audioEnded(): void {
    this.musicButton.classList.remove('music-button--active');
  }
}

export default MusicButton;
