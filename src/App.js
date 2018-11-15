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
            <DragDropContextProvider backend ={HTML5Backend}>
              <ConnectedRouter history = {history}>
                <Root/>
              </ConnectedRouter> 
              {/* connected router doljen but v DragDropContextProvider!!!!!!! */}
            </DragDropContextProvider>
        </Provider>  
      )   
  }
}

export default App;
