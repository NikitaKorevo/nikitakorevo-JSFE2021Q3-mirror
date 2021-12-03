import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '2e3ea17d4abc4478b961b51e74ed5d77', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
