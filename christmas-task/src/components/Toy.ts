import './Toy.scss';
import { IData } from '../data/interfaces';

class Toy {
  constructor(props: IData) {
    console.log('получилось' + props.name);

    /* this.num = props.num;
    this.name = props.name;
    this.count = props.count;
    this.year = props.year;
    this.shape = props.shape;
    this.color = props.color;
    this.size = props.size;
    this.favorite = props.favorite; */
  }
}

export default Toy;
