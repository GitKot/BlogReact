import React, {Component} from 'react'
import People from '../People/people'
import {connect} from 'react-redux'
import {addPeople} from '../../ducks/people'


class Peple extends Component {
    render(){
        return(
                <People onSubmit={this.peopleSubmit}/>
        )
    }

    peopleSubmit=(value)=>this.props.addPeople(value)
}

export default connect(null, {addPeople})(Peple)