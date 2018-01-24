import React from 'react';
import Infinite from 'react-infinite';
import MessageItem from './MessageItem.jsx';

const Messages = (props) => {
  return (
    <Infinite containerHeight={300} elementHeight={10}
      displayBottomUpwards>
      {props.messages.map((item, key) => {
        return <MessageItem message={item} key={key}/>
      })}
    </Infinite>
  )
}

export default Messages;
