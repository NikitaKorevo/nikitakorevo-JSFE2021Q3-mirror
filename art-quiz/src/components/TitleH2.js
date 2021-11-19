import './TitleH2.scss';

class TitleH2 {
  constructor(title) {
    this.title = title;
  }

  render() {
    const title = document.createElement('h2');
    title.classList.add('titleH2');
    title.textContent = this.title;
    return title;
  }
}

export default TitleH2;
