import React from 'react';

import Logo from './Logo/Logo';
import UsernameForm from './UsernameForm/UsernameForm';

import './Landing.scss';

const Landing = ({ io }) => {
  io.connect();
  return (
    <main className="landing">
      <Logo />
      <UsernameForm io={io} />
    </main>
  );
};

export default Landing;
