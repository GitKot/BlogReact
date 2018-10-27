import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorFild from '../common/errorField'

class People extends Component{
        render(){
            return (
                <div>
                    <h1>Add People</h1>
                    <form onSubmit = {this.props.handleSubmit}>
                    <div>
                        <Field name='firstname' 
                         component = {ErrorFild}
                         type="text" />
                    </div>
                    <div>
                        <Field name='lastname'
                         component = {ErrorFild} 
                        type="text" />
                    </div>
                    <div>
                        <Field name='email' 
                         component = {ErrorFild} 
                         type="text" /> 
                    </div>
                    <input type="submit"/>
                    </form>
                </div>
            )
        }
}

const validate = ({firstname, lastname, email })=>{
    const errors = {}
    if(!firstname ) errors.firstname = 'please enter you firstname'
    if(!lastname ) errors.lastname = 'please enter you lastname'
    if(!email) errors.email = 'email is required'
    else if(!emailValidator.validate(email)) errors.email = 'email is required'
    return errors
}

export default reduxForm({
    form:'people',
    validate
})(People)