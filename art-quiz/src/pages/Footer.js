import './Footer.scss';

const footer = document.createElement('footer');
footer.classList.add('footer');

class Footer {
  static render() {
    const linkImgRSSchool = document.createElement('a');
    linkImgRSSchool.href = 'https://rs.school/';
    linkImgRSSchool.target = '_blank';
    const imgRSSchool = document.createElement('img');
    imgRSSchool.classList.add('rsschool');
    imgRSSchool.src = './assets/svg/RSSchool320.svg';
    linkImgRSSchool.append(imgRSSchool);

    const year = document.createElement('span');
    year.classList.add('year');
    year.textContent = '2021';

    const linkGithub = document.createElement('a');
    linkGithub.href = 'https://github.com/NikitaKorevo';
    linkGithub.target = '_blank';
    const github = document.createElement('img');
    github.classList.add('github');
    github.src = './assets/svg/github.svg';
    linkGithub.append(github);

    footer.append(linkImgRSSchool, year, linkGithub);
    return footer;
  }
}

export default Footer;
