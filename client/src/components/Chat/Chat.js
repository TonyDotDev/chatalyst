import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';

import MessageDisplay from './MessageDisplay/MessageDisplay';
import MessageForm from './MessageForm/MessageForm';

import './Chat.scss';

const Chat = ({ io, history }) => {
  io.emit('room check');
  io.on('room check', response => {
    if (io.id === response.userId && !response.authorized) history.push('/');
  });

  const [message, setMessage] = useState({
    data: [
      {
        username: 'admin',
        message: 'welcome!',
        key: '11eyhekj',
        user: '34r3r3ferger',
      },
    ],
  });

  useEffect(() => {
    io.on('message', appendMessage);

    return () => {
      io.removeListener('message', appendMessage);
    };
  });

  const calculatePosition = () => {
    let top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);

    if (top > 90) top = 85;

    return {
      top: `${top}%`,
      left: `${left}%`,
    };
  };

  const appendMessage = res => {
    const usernameColor =
      io.id === res.user
        ? 'message__username--orange'
        : 'message__username--green';

    res.key = uuid();
    res.pos = calculatePosition();
    res.usernameColor = usernameColor;

    const messageCount = message.data.filter(userMessage => {
      return io.id === userMessage.user;
    }).length;

    if (messageCount === 2) {
      const filterUserMessagesOutArray = message.data.filter(
        userMessage => io.id !== userMessage.user,
      );
      setMessage({ data: [...filterUserMessagesOutArray, res] });
    } else setMessage({ data: [...message.data, res] });

    console.log(messageCount);
  };
  return (
    <main className="chat">
      <MessageDisplay io={io} items={message.data} />
      <MessageForm io={io} />
    </main>
  );
};

export default withRouter(Chat);
