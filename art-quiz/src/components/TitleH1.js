import './TitleH1.scss';

class Titleh1 {
  constructor() {
    this.title = 'Art Quiz';
  }

  render() {
    const title = document.createElement('h1');
    title.classList.add('titleH1');
    title.textContent = this.title;
    title.addEventListener('click', () => {
      window.location.hash = '';
    });
    return title;
  }
}

export default Titleh1;
