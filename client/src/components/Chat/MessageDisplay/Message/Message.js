import React from 'react';

import './Message.scss';

const Message = ({ messageData }) => {
  return (
    <div className="message" style={messageData.pos}>
      <span className={`message__username ${messageData.usernameColor}`}>
        {messageData.username}
      </span>
      <span className="message__content">{messageData.message}</span>
    </div>
  );
};

export default Message;
