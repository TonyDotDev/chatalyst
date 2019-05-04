import React from 'react';

import './MessageDisplay.scss';

const MessageDisplay = ({ io }) => {
  io.on('message', message => {
    console.log(message);
  });

  return <section className="message-display">MESSAGE DISPLAY</section>;
};

export default MessageDisplay;
