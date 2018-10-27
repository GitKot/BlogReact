import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'

class singInForm extends Component {
    render() {
        return(
            <div>
                <h1>sinInForm</h1>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                    <label>Email</label>
                    <Field component="input" name='email' type="text" placeholder="email"/>
                    </div>
                    <div>
                    <label>Password</label>
                    <Field component="input" name='password' type="password" placeholder="password"/>  
                    </div>
                    <div>
                    <input type="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form:'auth'
})(singInForm)