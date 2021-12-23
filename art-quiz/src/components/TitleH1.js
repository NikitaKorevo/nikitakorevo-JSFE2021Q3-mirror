import { HOME } from '../constants/constants';
import './TitleH1.scss';

class TitleH1 {
  constructor() {
    this.title = 'Art Quiz';
  }

  render() {
    const title = document.createElement('h1');
    title.classList.add('titleH1');
    title.textContent = this.title;
    title.addEventListener('click', () => {
      window.location.hash = HOME;
    });
    return title;
  }
}

export default TitleH1;
