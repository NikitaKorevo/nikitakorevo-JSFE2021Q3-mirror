import './scss/normalize.scss';
import './index.scss';
/* import App from './pages/App'; */
/* import './App.scss'; */
import Header from './pages/Header/Header';
import Main from './pages/Main/Main';
import Footer from './pages/Footer/Footer';

class App {
  header: Header;
  main: Main;
  footer: Footer;

  constructor() {
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  start() {
    const root = document.getElementById('root');
    root?.append(this.header.render(), this.main.render(), this.footer.render());
  }
}

const app = new App();
app.start();

/* const app = new App(); */
/* root?.append(app); */
/* import './pages/Header/Header.scss';
import './pages/Main/Main.scss';
import './pages/Footer/Footer.scss'; */
