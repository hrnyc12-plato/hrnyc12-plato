import React from 'react';
import io from '../../../node_modules/socket.io-client/dist/socket.io.js'
import Infinite from 'react-infinite';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MessageItem from './MessageItem.jsx';
import axios from 'axios';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      messages: [],
      room: this.props.eventId,
      message: '',
      socket: io(),
      img: this.props.img || 'http://www.nativementor.in/images/default_trainer.jpg'
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
  }

  componentDidMount() {
      this.state.socket.on('connect', () => {
        console.log("connected!!!!")
        this.state.socket.emit('room', this.state.room);
      })
      this.state.socket.on('chat message', (msg) => {
        console.log("MESSAGE:", msg);
        let holder = this.state.messages;
        holder.push(msg);
        this.setState({
          messages: holder
        });
      });

      axios.post('/server/chatMessages', {room: this.state.room}).then((data) => {
        console.log('DID WE ACCESSS DAT SUPER HOT FIRE', data)
        this.setState({messages: data.data})
      })
  }

  clickHandler(e) {
    this.state.socket.emit('chat message', {user: this.state.username, imgUrl: this.state.img, text: this.refs.userInput.getValue()})
      this.refs.userInput.input.value = '';
  }

  keyPressHandler(e) {
    if (e.key === 'Enter') {
      this.state.socket.emit('chat message', {user: this.state.username, imgUrl: this.state.img, text: this.refs.userInput.getValue()})
      this.refs.userInput.input.value = '';
    }
  }

  render() {
    console.log('Is my pretty face in here???', this.props)
    return(
      <div style={{"outline": "#0007 solid thick", "float": "right", "width": "300px", "display": "block", "paddingTop": "1%", "paddingLeft": "1%"}}>
        <Infinite containerHeight={300} elementHeight={30} style={{'listStyleType': 'none', 'margin': 0, 'padding': 0}}
          displayBottomUpwards>
          {this.state.messages.map((item, key) => {
            var color = 'white'
            if(item.user === this.state.username){
              color = 'rgba(173,216,230, 0.6)'
            }
            return (<MessageItem message={item.text} key={key} user={item.user} img={item.imgUrl} clr={color} />)
          })}
        </Infinite>
        <div style={{"paddingTop": "2%", "display": "block"}} onKeyUp={this.keyPressHandler}>
          <TextField
            id="inputText"
            ref="userInput"
            label="Bootstrap"
          />
          <RaisedButton onClick={this.clickHandler}>Send</RaisedButton>
        </div>
      </div>
    )
  }
}

export default ChatWindow;
