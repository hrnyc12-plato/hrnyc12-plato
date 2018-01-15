import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class LandingPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      eventId: ''
    }
    this.handleIdChange = this.handleIdChange.bind(this);
  }

  handleIdChange (e) {
    this.setState({
      eventId: e.target.value
    });
  }

  render () {
    const style = {
      textAlign: 'center',
      display: 'inline-block',
      padding: 25,
      primaryColor : '#ff5879'
    };

    return (
    <Paper style={style} zDepth={3}>
      <h1>WAYN</h1>
      <h3> Tired of being the first one there? Set up an event with us and we'll take care of the rest. </h3>
      <Link to='/create'><RaisedButton primary='true'>Get Started</RaisedButton></Link>
      <h3>Already invited?</h3> 
      <label>
        Enter your event ID
        <input type="text" value={this.state.eventId} onChange={this.handleIdChange} />
      </label>
      <Link to={'/event/' + this.state.eventId}><RaisedButton primary='true'>Submit</RaisedButton></Link>
    </Paper>
    )
  }
}
	
export default LandingPage;
