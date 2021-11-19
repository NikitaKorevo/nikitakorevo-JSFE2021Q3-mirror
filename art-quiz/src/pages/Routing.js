import './Routing.scss';
import General from './General';
import ArtistsQuiz from './ArtistsQuiz';

const main = document.createElement('main');
main.classList.add('main');

class Routing {
  render() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    const general = new General().render();
    const artistsQuiz = new ArtistsQuiz().render();

    switch (window.location.hash) {
      case '':
        console.log('1');
        main.append(general);
        break;
      case '#ArtistsQuiz/categories/':
        console.log('2');
        main.append(artistsQuiz);
        break;

      case '#ArtistsQuiz/categories/questions':
        console.log('2/2');
        break;

      case '#PicturesQuiz/categories/':
        console.log('3');
        break;

      default:
        /*         window.location.hash = '';
        main.append(general); */
        break;
    }
    return main;
  }
}

window.addEventListener('hashchange', () => {
  new Routing().render();
  console.log('Hash change!');
});

export default Routing;
