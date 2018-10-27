import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './redux/store'
import {ConnectedRouter} from 'react-router-redux'
import history from './history'
import Root from './component/Root'
import './App.css'
import './config'

class App extends Component {
  render() {
    return (
        <Provider store = {store}>
        <ConnectedRouter history = {history}>
          <Root/>
          </ConnectedRouter>  
        </Provider>  
    )
      
  }
}

export default App;
