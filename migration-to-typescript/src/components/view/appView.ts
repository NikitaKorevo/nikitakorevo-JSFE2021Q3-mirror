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

  drawNews(data: DrawNewsData): void {
    const values: DataNews[] = data?.articles ? data?.articles : [];
    this.news.drawNews(values);
  }

  drawSources(data: DrawSourcesData): void {
    const values: DataSources[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
