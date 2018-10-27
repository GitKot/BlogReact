import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import emailValidator from 'email-validator'
import errorFild from '../common/errorField'

class SinUpForm extends Component {
    render (){
        return (
            <div>
                <h1>sinUpForm</h1>
                <form onSubmit={this.props.handleSubmit}>
                                         
                    <Field name="email" component={errorFild} />
                      
                    <Field name="password" component={errorFild} type="password" />
                  
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

const validate = ({email, password}) => {
    const errors = {}
    if (!email) errors.email = 'email is required'
    else if(!emailValidator.validate(email)) errors.email = 'invalid email'
    if(!password) errors.password = 'password is required'
    else if(password.length < 8) errors.password = 'password to short'
    return errors
}

export default reduxForm({
    form:'auth',
    validate
})(SinUpForm)