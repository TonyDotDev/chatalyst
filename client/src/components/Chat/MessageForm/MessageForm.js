import React, { Component } from 'react';

import send from './send.svg';

import './MessageForm.scss';

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.io.emit('message', this.state.message);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form
        className="message-form"
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <input
          className="message-form__input"
          name="message"
          type="text"
          onChange={this.handleChange}
        />
        <button className="message-form__button" type="submit">
          <img
            className="message-form__button-icon"
            src={send}
            alt="send icon"
          />
        </button>
      </form>
    );
  }
}

export default MessageForm;
