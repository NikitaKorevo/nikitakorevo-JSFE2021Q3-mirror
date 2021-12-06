import News from './news/news';
import Sources from './sources/sources';
import { DataNews, DataSources, DrawNewsData, DrawSourcesData } from '../interface';

export class AppView {
  news: News;

  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: DrawNewsData) {
    const values: DataNews[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: DrawSourcesData) {
    const values: DataSources[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
