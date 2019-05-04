import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './UsernameForm.scss';

class UsernameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }
  handleSubmit = e => {
    e.preventDefault();

    this.props.io.emit('join room', this.state.username);

    this.props.io.on('join response', res => {
      if (res.error) console.log(res.error);
      if (res.id === this.props.io.id) {
        this.props.history.push('/chat');
      }
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form
        className="username-form"
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <input
          className="username-form__input"
          name="username"
          type="text"
          onChange={this.handleChange}
          placeholder="enter a username"
        />
        <button className="username-form__button" type="submit">
          Chat
        </button>
      </form>
    );
  }
}

export default withRouter(UsernameForm);
