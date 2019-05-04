import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import smallLogo from './small_logo.svg';
import './Header.scss';

const Header = ({ io, history }) => {
  const disconnectOnNavigate = e => {
    // emit signal to disconnect from room on server
    io.emit('leave room');
    if (
      e.currentTarget.href !==
      `http://localhost:3000${history.location.pathname}`
    )
      io.disconnect();
  };
  return (
    <header className="header">
      <Link onClick={disconnectOnNavigate} to="/">
        <img
          className="header__logo"
          src={smallLogo}
          alt="Chatalyst small logo: ChLy"
        />
      </Link>
      <nav className="header__navigation">
        <ul className="header__navigation-list">
          <li>
            <Link onClick={disconnectOnNavigate} to="/about">
              About
            </Link>
          </li>
          <li>
            <a href="#">Github</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
