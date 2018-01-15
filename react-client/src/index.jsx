import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Switch, Route, HashRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import EventMap from './components/EventMap.jsx';
import LoadingPage from './components/LoadingPage.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <main>
        
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/create" component={CreateEvent}/>
          <Route exact path="/event/:number" component={EventMap}/>   
          <Route exact path="/submit" component={LoadingPage}/>  
        </Switch>
      </main>
    );
  }
}


ReactDOM.render((
<MuiThemeProvider>
  <HashRouter>
    <App style={{textAlign:center}}/>
  </HashRouter>
</MuiThemeProvider>
), document.getElementById('app'));