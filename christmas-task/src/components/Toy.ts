import './Toy.scss';
import { IData } from '../data/interfaces';

class Toy {
  data: IData;

  constructor(data: IData) {
    this.data = data;
  }

  render() {
    const toyContainer = document.createElement('div');
    toyContainer.classList.add('toy');
    toyContainer.dataset.num = this.data.num;

    const name = document.createElement('h2');
    name.classList.add('toy__name');
    name.textContent = this.data.name;

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('toy__content');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('toy__img-container');
    const img = document.createElement('img');
    img.classList.add('toy__img');
    img.src = `./assets/toys/${this.data.num}.png`;
    img.alt = 'toy';
    imgContainer.append(img);

    const specificationContainer = document.createElement('div');
    specificationContainer.classList.add('toy__specification');

    const count = document.createElement('p');
    count.classList.add('toy__count');
    count.textContent = `Количество: ${this.data.count}`;

    const year = document.createElement('p');
    year.classList.add('toy__year');
    year.textContent = `Год покупки: ${this.data.year}`;

    const shape = document.createElement('p');
    shape.classList.add('toy__shape');
    shape.textContent = `Форма: ${this.data.shape}`;

    const color = document.createElement('p');
    color.classList.add('toy__color');
    color.textContent = `Цвет: ${this.data.color}`;

    const size = document.createElement('p');
    size.classList.add('toy__size');
    size.textContent = `Размер: ${this.data.size}`;

    const favorite = document.createElement('p');
    favorite.classList.add('toy__favorite');
    favorite.textContent = `Любимая: ${this.data.favorite ? 'Да' : 'Нет'}`;

    toyContainer.append(name, contentContainer);
    contentContainer.append(imgContainer, specificationContainer);
    specificationContainer.append(count, year, shape, color, size, favorite);

    return toyContainer;
  }
}

export default Toy;
