import React from 'react';
import { withRouter } from 'react-router-dom';

import MessageDisplay from './MessageDisplay/MessageDisplay';
import MessageForm from './MessageForm/MessageForm';

import './Chat.scss';

const Chat = ({ io, history }) => {
  io.emit('room check');
  io.on('room check', response => {
    if (io.id === response.userId && !response.authorized) history.push('/');
  });
  return (
    <main className="chat">
      <MessageDisplay io={io} />
      <MessageForm io={io} />
    </main>
  );
};

export default withRouter(Chat);
