import React from 'react';

import MessageDisplay from './MessageDisplay/MessageDisplay';
import MessageForm from './MessageForm/MessageForm';

import './Chat.scss';

const Chat = ({ io }) => (
  <main className="chat">
    <MessageDisplay io={io} />
    <MessageForm io={io} />
  </main>
);

export default Chat;
