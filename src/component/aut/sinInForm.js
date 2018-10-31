import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import errorFild from '../common/errorField'

class singInForm extends Component {
    render() {
        return(
            <div>
                <h1>sinInForm</h1>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                  
                    <Field component={errorFild} name='email' type="text" />
                    </div>
                    <div>
                   
                    <Field component={errorFild} name='password' type="password" />  
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