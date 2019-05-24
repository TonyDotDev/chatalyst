import React from 'react';
import { Link } from 'react-router-dom';

import './About.scss';

const About = () => (
  <main className="about">
    <h2 className="about__headline">
      <span className="about__headline--orange">About</span>{' '}
      <span className="about__headline--green">Chatalyst</span>
    </h2>
    <p className="about__paragraph">
      Connect to a hand crafted, randomly generated room and chat with a random
      assortment of internet denizens.{' '}
    </p>

    <p className="about__paragraph">
      Chatalyst is an experimental chat application developed with ReactJS,
      NodeJS and Socket.io. It was designed and developed by <a href="#">ME</a>.
    </p>
    <div className="about__cta-link">
      <Link to="/">start chatting</Link>
    </div>
  </main>
);

export default About;
