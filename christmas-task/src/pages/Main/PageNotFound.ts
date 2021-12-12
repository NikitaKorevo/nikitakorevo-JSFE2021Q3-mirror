import './PageNotFound.scss';

class PageNotFound {
  render() {
    const container = document.createElement('div');
    container.classList.add('page-not-found');

    const errorNum = document.createElement('span');
    errorNum.classList.add('page-not-found__error-num');
    errorNum.textContent = '404';

    const errorText = document.createElement('span');
    errorText.classList.add('page-not-found__error-text');
    errorText.textContent = 'Page not found';

    container.append(errorNum, errorText);
    return container;
  }
}

export default PageNotFound;
