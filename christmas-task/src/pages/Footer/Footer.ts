import './Footer.scss';

class Footer {
  render(): HTMLDivElement {
    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('footer__wrapper');

    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const year = document.createElement('span');
    year.classList.add('year');
    year.textContent = '2021';

    const github = document.createElement('a');
    github.classList.add('github');
    github.textContent = 'github';
    github.href = 'https://github.com/NikitaKorevo';
    github.target = '_blank';

    const rssLogo = document.createElement('a');
    rssLogo.classList.add('rss-logo');
    rssLogo.href = 'https://rs.school/js/';
    rssLogo.target = '_blank';

    const rssImg = document.createElement('img');
    rssImg.src = './assets/svg/rss.svg';
    rssImg.height = 35;

    footerWrapper.append(footer);
    footer.append(year, github, rssLogo);
    rssLogo.append(rssImg);

    return footerWrapper;
  }
}

export default Footer;
