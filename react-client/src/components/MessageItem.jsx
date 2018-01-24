import React from 'react';
import Card, { CardHeader } from 'material-ui/Card';

const MessageItem = (props) => {
	return(
    <div>
      <li style={{ "listStyleType": "none", "width": "100%", "padding": "5px 10px"}}>
      <CardHeader style={{"width": "100%", backgroundColor:props.clr }} avatar={props.img} title={props.user +' : ' + props.message}>
      </CardHeader>
      </li>
    </div>)
}

export default MessageItem;




//use this as replacement for li in messages