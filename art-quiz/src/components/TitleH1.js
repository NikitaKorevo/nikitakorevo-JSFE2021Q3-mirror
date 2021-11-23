import './TitleH1.scss';

class Titleh1 {
  constructor() {
    this.title = 'Art Quiz';
  }

  render() {
    const link = document.createElement('a');
    link.href = '';
    link.classList.add('titleH1-link');
    const title = document.createElement('h1');
    title.classList.add('titleH1');
    title.textContent = this.title;
    link.append(title);
    return link;
  }
}

export default Titleh1;
