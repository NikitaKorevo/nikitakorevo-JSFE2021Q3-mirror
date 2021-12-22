import './sources.css';
import { DataSources } from '../../interface';

class Sources {
  draw(data: DataSources[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

    data.forEach((item: DataSources) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);

      ((<HTMLElement>sourceClone).querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.name;
      ((<HTMLElement>sourceClone).querySelector('.source__item') as HTMLTemplateElement).setAttribute(
        'data-source-id',
        item.id
      );

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
