import './Home.scss';

class Home {
  render() {
    const home = document.createElement('div');
    home.classList.add('home');

    const homeContainer = document.createElement('div');
    homeContainer.classList.add('home__container');

    const homeTitle = document.createElement('h1');
    homeTitle.classList.add('home__title');
    homeTitle.innerHTML = 'Новогодняя игра<br />«Наряди ёлку»';

    const homeButton = document.createElement('button');
    homeButton.classList.add('home__button');
    homeButton.textContent = 'Начать';
    homeButton.addEventListener('click', () => (window.location.hash = 'toys'));

    home.append(homeContainer, homeButton);
    homeContainer.append(homeTitle);
    return home;
  }
}

export default Home;
