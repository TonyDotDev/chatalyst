import React from 'react';
import { Spring } from 'react-spring/renderprops';

import './Counter.scss';

const Counter = ({ title, count, icon }) => (
  <Spring from={{ number: 0 }} to={{ number: count }}>
    {props => (
      <div className="counter">
        <img className="counter__icon" src={icon} alt="" />
        <div className="counter__title">{title}</div>
        <div className="counter__number">{props.number.toFixed()}</div>
      </div>
    )}
  </Spring>
);

export default Counter;
