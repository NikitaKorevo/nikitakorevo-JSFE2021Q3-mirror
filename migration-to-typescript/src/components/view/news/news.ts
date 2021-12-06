import './news.css';
import { DataNews } from '../../interface';

class News {
  draw(data: DataNews[]) {
    const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;
    const fragment = document.createDocumentFragment();
    const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

    news.forEach((item, idx: number) => {
      const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

      if (idx % 2) (newsClone as HTMLElement).querySelector('.news__item')?.classList.add('alt');

      ((newsClone as HTMLElement).querySelector(
        '.news__meta-photo'
      ) as HTMLTemplateElement).style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      ((newsClone as HTMLElement).querySelector('.news__meta-author') as HTMLTemplateElement).textContent =
        item.author || item.source.name;
      ((newsClone as HTMLElement).querySelector(
        '.news__meta-date'
      ) as HTMLTemplateElement).textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      (<HTMLElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
      (<HTMLElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
      (<HTMLElement>newsClone.querySelector('.news__description-content')).textContent = item.description;
      (<HTMLElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    const elNews = <HTMLDivElement>document.querySelector('.news');
    elNews.innerHTML = '';
    elNews.appendChild(fragment);
  }
}

export default News;
