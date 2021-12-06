import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DrawNewsData, DrawSourcesData } from '../interface';

class App {
  controller: AppController;

  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    document
      .querySelector('.sources')
      ?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(<DrawNewsData>data)));
    this.controller.getSources((data) => this.view.drawSources(<DrawSourcesData>data));
  }
}

export default App;
