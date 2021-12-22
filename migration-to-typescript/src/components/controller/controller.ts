import AppLoader from './appLoader';
import { DrawNewsData, DrawSourcesData } from '../interface';

class AppController extends AppLoader {
  getSources(callback: (data?: DrawSourcesData) => void): void {
    super.getResponse({ endpoint: 'sources' }, callback);
  }

  getNews(e: Event, callback: (data?: DrawNewsData) => void): void {
    let target = <HTMLElement>e.target;
    const newsContainer = <HTMLElement>e.currentTarget;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId as string);
          super.getResponse({ endpoint: 'everything', options: { sources: sourceId } }, callback);
        }
        return;
      }
      target = <HTMLElement>target.parentNode;
    }
  }
}

export default AppController;
