import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import authRouts from './Routs/authRouts'
import adminRouts from './Routs/adminRouts'
import ProtectedRoute from './common/ProtectedRout'
import People from './Routs/peopleRout'

class Root extends Component {
    render(){
        return(
            <div>
                <Route path = '/auth' component = {authRouts}/>
                <ProtectedRoute path = '/admin' component = {adminRouts}/>
                <Route path = '/people' component = {People}/>
            </div>
        )
    }
} 

export default Root