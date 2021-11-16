import Button from './button';
import Title from './title';

class Main {
  render() {
    const main = document.createElement('main');
    main.classList.add('main');
    const buttonArtist = new Button('Artist quiz').render();
    const buttonPictures = new Button('Pictures quiz').render();
    const title = new Title().render();

    switch (window.location.hash) {
      case '':
        console.log('1');
        main.append(title, buttonArtist, buttonPictures);
        break;
      case '#ArtisQuiz/categories/':
        console.log('2');
        break;

      case '#PicturesQuiz/categories/':
        console.log('3');
        break;

      default:
        break;
    }
    return main;
  }
}

export default Main;
