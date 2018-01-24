import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Lyft extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cost: this.props.cost,
      time: this.props.time
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('willRecieveProps', nextProps)
    this.setState({
      cost: (nextProps.cost / 100 ),
      time: (nextProps.time / 60 )
    })
  }

  render(){
    console.log('props', this.props, 'state', this.state)
    if(this.state.time > 0){
      return(<div>

         <Paper style={{maxWidth:'450px', height: '90px'}}>
            <RaisedButton onClick={this.props.getLyftEstimates}> <img style={{width:'40px', height:'auto', paddingTop:'5px'}} src="http://getlyftcode.com/img/logo.png" /> 
         </RaisedButton>
         <div style={{float:'bottom', display:'flex', flexDirection:'column', padding:'5px'}}>
         <div style={{paddingTop:'2px'}}>
         <img style={{width:'18px', height:'auto', float:'left'}}src='http://cdn.mysitemyway.com/icons-watermarks/simple-ios-pink-gradient/classica/classica_wall-clock/classica_wall-clock_simple-ios-pink-gradient_512x512.png' />
          <div style={{textAlign: 'left', paddingLeft:'2px', float:'bottom'}}> {this.state.time.toFixed(0)} mins </div>
          </div>
          <div style={{paddingTop:'5px'}}>
         <img style={{width:'18px', height:'auto', float:'left'}}src='http://cdn.mysitemyway.com/icons-watermarks/simple-ios-pink-gradient/raphael/raphael_dollar-sign/raphael_dollar-sign_simple-ios-pink-gradient_512x512.png' />
         <div style={{textAlign: 'left', paddingLeft:'2px', float:'bottom'}}> {this.state.cost.toFixed(2)} </div>
         </div>

         </div> 

         </Paper>
         </div>)
    } else{
      return(
        <div>

         <Paper style={{maxWidth:'450px', height: '90px'}}>
            <RaisedButton onClick={this.props.getLyftEstimates}> <img style={{width:'40px', height:'auto', paddingTop:'5px'}} src="http://getlyftcode.com/img/logo.png" /> 
         </RaisedButton>
         <div style={{float:'bottom', display:'flex', flexDirection:'column', padding:'5px'}}>
         <img style={{height:'50px', width: 'auto'}} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cd514331234507.564a1d2324e4e.gif" /> 
         </div> 

         </Paper>
         </div>
        )
    }

  }

}

export default Lyft