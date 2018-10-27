import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {moduleName} from '../../ducks/auth'
import UnAutorized from '../common/unAutorized'

class ProtectedRoute extends Component {
    render(){
        const {component, ...rest} = this.props
        return(
            <Route {...rest} render={this.protComp}/>
        )
    }
    protComp = (routeProps) => {
        const {component: ProtectedComponent, autorized} = this.props
        
        return autorized ? <ProtectedComponent {...routeProps}/> : <UnAutorized/>
    }
}

export default  connect(state => ({
    autorized: !!state[moduleName].user
}), null, null, {pure:false} )(ProtectedRoute)