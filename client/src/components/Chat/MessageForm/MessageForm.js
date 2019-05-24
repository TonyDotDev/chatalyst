import React, { useRef, useState, useEffect } from 'react';

import send from './send.svg';
import ValidationMessage from '../../ValidationMessage/ValidationMessage';

import './MessageForm.scss';

const MessageForm = ({ io }) => {
  const [input, setInput] = useState({ message: '' });

  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();

    io.on('message form error', handleValidationError);

    return () => {
      io.removeListener('message form error', handleValidationError);
    };
  });

  const handleValidationError = response => {
    if (io.id === response.userId && response.error)
      setInput({ ...input, error: response.error });
  };

  const handleSubmit = e => {
    e.preventDefault();

    io.emit('message', input.message);
    setInput({ message: '' });
    inputElement.current.focus();
  };

  const handleChange = e => {
    setInput({ [e.target.name]: e.target.value });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="message-form__input"
        name="message"
        type="text"
        value={input.message}
        ref={inputElement}
        onChange={handleChange}
      />
      <button className="message-form__button" type="submit">
        <img className="message-form__button-icon" src={send} alt="send icon" />
      </button>
      <ValidationMessage message={input} />
    </form>
  );
};

export default MessageForm;
