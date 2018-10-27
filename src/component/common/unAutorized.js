import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class UnAutorized extends Component{
    render(){
        return (
        <div>
            Please Autorized!! <Link to="/auth/signin" >Autorized</Link>
        </div>)
    }
}

export default UnAutorized