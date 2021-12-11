import './Footer.scss';

class Footer {
  render() {
    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('footer__wrapper');

    const footer = document.createElement('div');
    footer.classList.add('footer');

    footerWrapper.append(footer);
    return footerWrapper;
  }
}

export default Footer;
