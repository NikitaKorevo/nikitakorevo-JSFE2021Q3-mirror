import './scss/index.scss';
import Header from './pages/Header';
import Routing from './pages/Routing';
import Footer from './pages/Footer';

const root = document.getElementById('root');

class App {
  constructor() {
    this.title = 'title';
    this.h2 = document.createElement('h2');
  }

  render() {
    /* root.innerText = ''; */
    const div = document.createElement('div');
    const header = new Header();
    const routing = new Routing('asdf');
    div.append(header.render(), routing.render(), Footer.render());
    root.append(div);
  }
}

const app = new App();
app.render();
