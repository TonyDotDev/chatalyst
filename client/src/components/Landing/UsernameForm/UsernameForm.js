import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './UsernameForm.scss';

const UsernameForm = ({ io, history }) => {
  const [input, setInput] = useState({ username: '', error: '' });

  const handleSubmit = e => {
    e.preventDefault();

    io.emit('join room', input.username);

    io.on('join response', res => {
      if (res.error && io.id === res.userId)
        setInput({ ...input, error: res.error });
      else if (res.id === io.id) {
        history.push('/chat');
      }
    });
  };

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <form className="username-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="username-form__input"
        name="username"
        type="text"
        onChange={handleChange}
        placeholder="enter a username"
      />
      <button className="username-form__button" type="submit">
        Chat
      </button>
      <div className="username-form__validation-error">
        <p>{input.error ? input.error : null}</p>
      </div>
    </form>
  );
};

export default withRouter(UsernameForm);
