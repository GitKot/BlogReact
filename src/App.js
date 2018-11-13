import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './redux/store'
import {ConnectedRouter} from 'react-router-redux'
import history from './history'
import Root from './component/Root'
import './App.css'
import './config'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class App extends Component {
  render() {
    return (
        <Provider store = {store}>
          <ConnectedRouter history = {history}>
            <DragDropContextProvider backend ={HTML5Backend}>
                    <Root/>
            </DragDropContextProvider>
          </ConnectedRouter>  
        </Provider>  
    )
      
  }
}

export default App;
