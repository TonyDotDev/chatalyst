import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';

import './MessageDisplay.scss';

const MessageDisplay = ({ io }) => {
  const [message, setMessage] = useState({ content: [] });

  useEffect(() => {
    io.on('message', appendMessage);

    return () => {
      io.removeListener('message', appendMessage);
    };
  });

  const appendMessage = res => {
    console.log(res);
    const filteredMessageDataArray = message.content.filter(data => {
      return data.user !== res.user;
    });
    setMessage({ content: [...filteredMessageDataArray, res] });
  };

  return (
    <section className="message-display">
      <div>
        {message.content.map(messageData => (
          <h1 key={uuid()}>{messageData.message}</h1>
        ))}
      </div>
    </section>
  );
};

export default MessageDisplay;
