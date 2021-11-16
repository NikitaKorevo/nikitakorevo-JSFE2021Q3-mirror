class Header {
  static render() {
    const header = document.createElement('header');
    header.classList.add('header');

    const settings = document.createElement('img');
    settings.classList.add('settings');
    settings.src = './assets/svg/settings.svg';

    header.append(settings);
    return header;
  }
}

export default Header;
