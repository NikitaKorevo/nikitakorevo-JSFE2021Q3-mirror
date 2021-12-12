import './Toys.scss';
import data from '../../data/data';
import { IData } from '../../data/interfaces';
import Toy from '../../components/Toy';

class Toys {
  data: IData[];

  constructor() {
    this.data = data;
  }

  render() {
    const text = document.createElement('h2');
    text.textContent = 'asdf';
    for (let i = 0; i < this.data.length; i++) {
      new Toy(this.data[i]);
    }
    return text;
  }
}

export default Toys;
