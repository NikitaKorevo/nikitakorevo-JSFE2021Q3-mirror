import ChristmasTree from '../../pages/Main/ChristmasTree';
import './SnowflakeButton.scss';

class Snowflake {
  buttonSnowFlake: HTMLElement;
  startCreateSnowFlake: NodeJS.Timer | null;

  constructor() {
    this.startCreateSnowFlake = null;
    this.buttonSnowFlake = document.createElement('button');
    this.buttonSnowFlake.classList.add('snowflake-button');
    this.buttonSnowFlake.addEventListener('click', () => this.toggleFallSnowFlake());

    if (ChristmasTree.settingsChristmasTree.areSnowflakesFalling) this.toggleFallSnowFlake();
  }

  toggleFallSnowFlake() {
    const isButtonSnowFlakeActive = this.buttonSnowFlake.classList.contains('snowflake-button--active');
    if (isButtonSnowFlakeActive) {
      this.buttonSnowFlake.classList.remove('snowflake-button--active');
      ChristmasTree.settingsChristmasTree.areSnowflakesFalling = false;
      ChristmasTree.settingsChange();
    } else {
      this.buttonSnowFlake.classList.add('snowflake-button--active');
      ChristmasTree.settingsChristmasTree.areSnowflakesFalling = true;
      ChristmasTree.settingsChange();

      const startCreateSnowFlake = setInterval(() => {
        const isButtonSnowFlakeActive = this.buttonSnowFlake.classList.contains('snowflake-button--active');

        if (!isButtonSnowFlakeActive) clearInterval(startCreateSnowFlake);
        this.createSnowFlake();
      }, 50);
    }
  }

  createSnowFlake() {
    const snowFlake = document.createElement('span');
    snowFlake.classList.add('snowflake');
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
    snowFlake.style.opacity = String(Math.random());
    const size = Math.random() * 10 + 10;
    snowFlake.style.height = snowFlake.style.width = size + 'px';
    snowFlake.style.left = Math.random() * ChristmasTree.middleContainer.clientWidth - size + 'px';
    ChristmasTree.middleContainer.append(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }
}

export default Snowflake;
