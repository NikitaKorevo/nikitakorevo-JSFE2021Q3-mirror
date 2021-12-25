import './Background.scss';

class Background {
  numberBackground: number;
  background: HTMLDivElement;

  constructor(numberBackground: number) {
    this.numberBackground = numberBackground;

    this.background = document.createElement('div');
    this.background.classList.add('background');
    this.background.style.backgroundImage = `url('./assets/bg/${this.numberBackground}.jpg')`;
  }
}

export default Background;

/* class Background {
  numberBackground: number;

  constructor(numberBackground: number) {
    this.numberBackground = numberBackground;
  }

  render() {
    const background = document.createElement('div');
    background.classList.add('background');
    background.style.backgroundImage = `url('./assets/bg/${this.numberBackground}.jpg')`;
    return background;
  }
}

export default Background; */
