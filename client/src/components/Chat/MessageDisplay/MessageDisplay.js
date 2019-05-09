import React from 'react';
import { useTransition, animated } from 'react-spring';

import Message from './Message/Message';

import './MessageDisplay.scss';

const MessageDisplay = ({ items, userDisplay, io }) => {
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
        } else if (!userDisplay && io.id !== item.user) {
          messageJsx = (
            <animated.div key={key} style={props}>
              <Message messageData={item} />
            </animated.div>
          );
        }

        return messageJsx;
      })}
    </section>
  );
};

export default MessageDisplay;
