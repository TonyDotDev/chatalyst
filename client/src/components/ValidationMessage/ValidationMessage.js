import React from 'react';

import './ValidationMessage.scss';

const ValidationMessage = ({ message }) => (
  <div className="validation-message">
    <p>{message.error ? message.error : null}</p>
  </div>
);

export default ValidationMessage;
