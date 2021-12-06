import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', { apiKey: '2e3ea17d4abc4478b961b51e74ed5d77' }); // originalSite: 'https://newsapi.org/v2/'
  }
}

export default AppLoader;
