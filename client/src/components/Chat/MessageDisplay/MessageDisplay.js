import React from 'react';
import { useTransition, animated } from 'react-spring';

import Message from './Message/Message';

import './MessageDisplay.scss';

const MessageDisplay = ({ items }) => {
  const transition = useTransition(items, item => item.key, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <section className="message-display">
      {transition.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          <Message messageData={item} />
        </animated.div>
      ))}
    </section>
  );
};

export default MessageDisplay;
