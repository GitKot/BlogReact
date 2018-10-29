import React, {Component} from 'react'
import {Route, NavLink} from 'react-router-dom'
import SinInForm from '../aut/sinInForm'
import SinUpForm from '../aut/sinUpForm'
import {signUp, moduleName, signIn} from '../../ducks/auth'
import {connect} from 'react-redux'
import Loader from '../common/Loader'

class authRouts extends Component {
    render(){
        const {loading, error} = this.props
        console.log('____', error)
       
        return (
            <div>
                <NavLink to = "/auth/signin" activeStyle ={{color: 'red'}}>sinIn</NavLink>
                <NavLink to ="/auth/signup" activeStyle = {{color: 'red'}}>sinUp</NavLink>
                
                <Route path = "/auth/signin" render={()=> <SinInForm onSubmit={this.handleSinInSubmit}/>}/>
                
               
                <Route path = "/auth/signup" render={ ()=> <SinUpForm onSubmit={this.handleSinUpSubmit}/> }/>
               
             
                {loading && <Loader/>}
                { error && <div style={{color:'red'}}>{error.message}</div>}
                
            </div>
        )
    }
    handleSinInSubmit =({email, password})=> this.props.signIn(email, password)
    handleSinUpSubmit =({email, password})=> this.props.signUp(email, password)
}

export default connect(state => ({
  loading:!!state[moduleName].loading,
  error: state[moduleName].error
}), {signUp, signIn}) (authRouts)