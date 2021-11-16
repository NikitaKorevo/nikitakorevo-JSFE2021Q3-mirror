/* import image from './images/lazy.png'; */
import './scss/index.scss';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

const root = document.getElementById('root');
const main = new Main('asdf');
class App {
  constructor() {
    this.title = 'title';
    this.h2 = document.createElement('h2');
    /* this.main = new Main('asdf'); */
    console.log(window.location.hash);
  }

  render() {
    root.innerText = '';
    const div = document.createElement('div');
    // window.location.hash

    div.append(Header.render(), main.render(), Footer.render());
    root.append(div);
    /* return div; */
  }
}

const app = new App();
app.render();

/* const root = document.getElementById('root');

class App {
  constructor() {
    this.title = 'title';
    this.h2 = document.createElement('h2');
  }

  render() {
    setTimeout(() => {
      this.h2.textContent = 'asdfszxcvdf';
      console.log('EEEE');
    }, 1000);

    this.h2.textContent = this.title;
    console.log((this.h2.textContent = this.title));
    return this.h2;
  }
}
root.append(new App().render()); */
