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
        username: 'a',
        message: 'dummy text',
        key: '11eyhekj',
        user: '34r3r3ferger',
        pos: { display: 'none' },
      },
    ],
  });

  useEffect(() => {
    io.on('message', appendMessage);

    return () => {
      io.removeListener('message', appendMessage);
    };
  });

  const appendMessage = res => {
    const usernameColor =
      io.id === res.user
        ? 'message__username--orange'
        : 'message__username--green';

    res.key = uuid();
    res.usernameColor = usernameColor;

    const filterUserMessagesOutArray = message.data.filter(
      userMessage => res.user !== userMessage.user,
    );

    setMessage({ data: [...filterUserMessagesOutArray, res] });
  };
  return (
    <main className="chat">
      <MessageDisplay io={io} userDisplay={true} items={message.data} />
      <MessageDisplay io={io} items={message.data} />
      <MessageForm io={io} />
    </main>
  );
};

export default withRouter(Chat);
