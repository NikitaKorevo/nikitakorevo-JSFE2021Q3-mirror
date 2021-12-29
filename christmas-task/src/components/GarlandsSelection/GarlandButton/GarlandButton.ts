import './GarlandButton.scss';

class GarlandButton {
  color: string;
  garland: HTMLButtonElement;

  constructor(color: string) {
    this.color = color;

    this.garland = document.createElement('button');
    this.garland.classList.add('garland-button');
    this.garland.style.backgroundColor = color;
  }

  /* clickGarlandButton() {
    this.garland.classList.toggle('garland-button--active');
  } */
}

export default GarlandButton;
