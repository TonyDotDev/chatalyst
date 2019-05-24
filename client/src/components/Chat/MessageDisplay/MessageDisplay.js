import React from 'react';
import { useTransition, animated } from 'react-spring';
import uuid from 'uuid';

import Message from './Message/Message';
import clockIcon from './clock-icon.svg';

import './MessageDisplay.scss';

const MessageDisplay = ({ items, userDisplay, io, user }) => {
  console.log(items, user);
  const transition = useTransition(items, item => item.key, {
    from: {
      opacity: 0,
      transform: 'translateX(-10%)',
      left: '50%',
      display: 'inline-block',
      position: 'absolute',
    },
    enter: {
      opacity: 1,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'inline-block',
      position: 'absolute',
    },
    leave: {
      opacity: 0,
      left: '50%',
      transform: 'translateX(-90%)',
      display: 'inline-block',
      position: 'absolute',
    },
  });

  return (
    <section className="message-display">
      {transition.map(({ item, key, props }) => {
        let messageJsx;
        if (userDisplay && io.id === item.user) {
          messageJsx = (
            <animated.div key={key} style={props}>
              <Message messageData={item} />
            </animated.div>
          );
        } else if (!userDisplay && io.id !== item.user && user === item.user) {
          messageJsx = (
            <animated.div key={key} style={props}>
              <Message messageData={item} />
            </animated.div>
          );
        } else if (!userDisplay && io.id !== item.user && user === null)
          messageJsx = (
            <div className="message-display__no-user" key={uuid()}>
              <img
                className="message-display__clock-icon"
                src={clockIcon}
                alt="clock icon"
              />
              <p>Waiting For A User To Join</p>
            </div>
          );

        return messageJsx;
      })}
    </section>
  );
};

export default MessageDisplay;
