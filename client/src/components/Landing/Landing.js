import React, { useState, useEffect } from 'react';

import Logo from './Logo/Logo';
import UsernameForm from './UsernameForm/UsernameForm';
import Counter from '../Counter/Counter';

import roomIcon from './room-icon.svg';
import userIcon from './user-icon.svg';

import './Landing.scss';

const Landing = ({ io }) => {
  const [numberOfUsers, setNumberOfUsers] = useState({ count: 0 });
  const [numberOfRooms, setNumberOfRooms] = useState({ count: 0 });
  io.connect();
  useEffect(() => {
    io.emit('count');

    io.on('count', handleCount);

    return () => {
      io.removeListener('count', handleCount);
    };
  }, [io]);

  const handleCount = response => {
    setNumberOfUsers({ count: response.users });
    setNumberOfRooms({ count: response.rooms });
  };

  return (
    <main className="landing">
      <Logo />
      <UsernameForm io={io} />
      <div className="landing__counter-container">
        <Counter icon={userIcon} title="users" count={numberOfUsers.count} />
        <Counter icon={roomIcon} title="rooms" count={numberOfRooms.count} />
      </div>
    </main>
  );
};

export default Landing;
