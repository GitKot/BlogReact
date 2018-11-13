import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import authRouts from './Routs/authRouts'
import adminRouts from './Routs/adminRouts'
import ProtectedRoute from './common/ProtectedRout'
import People from './Routs/peopleRout'
import {connect} from 'react-redux'
import {signOut, moduleName} from '../ducks/auth'
import {Link} from 'react-router-dom'
import EventsPage from './Routs/EventsPage'
import CustomDraglayer from './customDrugLayer'

class Root extends Component {
    render(){
        const {autorized, signOut} = this.props
        const btn = autorized ? 
        <button onClick={signOut}>signOut</button>:
        <Link to = "/auth/signin">signIn</Link>
        return(
            <div>
                {btn}
                <Route path = '/auth' component = {authRouts}/>
                <ProtectedRoute path = '/admin' component = {adminRouts}/>
                <ProtectedRoute path = '/people' component = {People}/>
                <ProtectedRoute path = '/events' component = {EventsPage}/>
                <CustomDraglayer/>
            </div>
        )
    }
} 

export default connect((state)=>({
    autorized: !!state[moduleName].user
}),{signOut}, null, {pure:false})(Root)