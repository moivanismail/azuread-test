import logo from './logo.svg';
import './App.css';
import {config} from './Config';
import { PublicClientApplication } from '@azure/msal-browser';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {},
      error: null
    };
this.login = this.login.bind(this);
// initiate the MSAL application object
this.publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  }
});
  }
async login() {
  try{
    // login via popup
    await this.publicClientApplication.loginPopup(
      {
        scopes: config.scopes,
        prompt: "select_account"
      });
      this.setState({isAuthenticated: true});
  }
  catch(err){
    this.setState({
      isAuthenticated: false,
      user: {},
      error: err
    });
  }
}

logout(){
  this.publicClientApplication.logout();
}

render(){
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        {this.state.isAuthenticated ? <p>
          Successful Logged in
        </p>:
        <p>
          <button onClick={() => this.login()}>Login</button>
        </p>
        }
      </header>
      </div>
    );
  }
}
export default App;
