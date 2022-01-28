import './Footer.scss';
import React from 'react';
import rssLogo from '../../svg/rssLogo.svg';

function Footer(): JSX.Element {
  return (
    <footer className="Footer">
      <div className="Footer__content">
        <span className="year">2022</span>
        <a
          className="github"
          href="https://github.com/NikitaKorevo"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <a
          className="rss-logo-link"
          href="https://rs.school/js/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="rss-logo-img" src={rssLogo} alt="rss-logo" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
