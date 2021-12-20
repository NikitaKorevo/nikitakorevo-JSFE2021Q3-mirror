import './Toy.scss';
import { IToy } from '../data/interfaces';

class Toy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;

  constructor(data: IToy) {
    this.num = data.num;
    this.name = data.name;
    this.count = data.count;
    this.year = data.year;
    this.shape = data.shape;
    this.color = data.color;
    this.size = data.size;
    this.favorite = data.favorite;
  }

  renderZeroToys() {
    const toyContainer = document.createElement('div');
    toyContainer.classList.add('toy');
    toyContainer.style.cursor = 'default';

    const name = document.createElement('h2');
    name.classList.add('toy__zero-name');
    name.textContent = 'Извините, совпадений не обнаружено';
    toyContainer.append(name);
    return toyContainer;
  }

  render() {
    const toyContainer = document.createElement('div');
    toyContainer.classList.add('toy');
    toyContainer.dataset.num = this.num;

    const name = document.createElement('h2');
    name.classList.add('toy__name');
    name.textContent = this.name;

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('toy__content');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('toy__img-container');
    const img = document.createElement('img');
    img.classList.add('toy__img');
    img.src = `./assets/toys/${this.num}.png`;
    img.alt = 'toy';
    imgContainer.append(img);

    const specificationContainer = document.createElement('div');
    specificationContainer.classList.add('toy__specification');

    const count = document.createElement('p');
    count.classList.add('toy__count');
    count.textContent = `Количество: ${this.count}`;

    const year = document.createElement('p');
    year.classList.add('toy__year');
    year.textContent = `Год покупки: ${this.year}`;

    const shape = document.createElement('p');
    shape.classList.add('toy__shape');
    shape.textContent = `Форма: ${this.shape}`;

    const color = document.createElement('p');
    color.classList.add('toy__color');
    color.textContent = `Цвет: ${this.color}`;

    const size = document.createElement('p');
    size.classList.add('toy__size');
    size.textContent = `Размер: ${this.size}`;

    const favorite = document.createElement('p');
    favorite.classList.add('toy__favorite');
    favorite.textContent = `Любимая: ${this.favorite ? 'Да' : 'Нет'}`;

    toyContainer.append(name, contentContainer);
    contentContainer.append(imgContainer, specificationContainer);
    specificationContainer.append(count, year, shape, color, size, favorite);

    return toyContainer;
  }
}

export default Toy;
