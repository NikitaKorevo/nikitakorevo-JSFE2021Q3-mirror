import './scss/normalize.scss';
import './index.scss';
import Header from './pages/Header/Header';
import Main from './pages/Main/Main';
import Footer from './pages/Footer/Footer';
import './score';

class App {
  header: Header;
  main: Main;
  footer: Footer;

  constructor() {
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  start(): void {
    const root = document.getElementById('root');
    root?.append(this.header.render(), this.main.render(), this.footer.render());
  }
}

const app = new App();
app.start();
