import './Footer.scss';

const footer = document.createElement('footer');
footer.classList.add('footer');

class Footer {
  static render() {
    const imgRSSchool = document.createElement('img');
    imgRSSchool.classList.add('rsschool');
    imgRSSchool.src = './assets/svg/RSSchool320.svg';

    const year = document.createElement('span');
    year.classList.add('year');
    year.textContent = '2021';

    const github = document.createElement('img');
    github.classList.add('github');
    github.src = './assets/svg/github.svg';

    footer.append(imgRSSchool, year, github);
    return footer;
  }
}

export default Footer;
