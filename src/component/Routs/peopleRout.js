import React, {Component} from 'react'
import People from '../People/people'
import {connect} from 'react-redux'
import {addPeople} from '../../ducks/people'
import { modyleName } from '../../ducks/people';
import Loader from '../common/Loader';
import TablePeople from '../People/TablePeople';


class Peple extends Component {
    render(){
        const {loading} = this.props
        return(
            <div>
                <TablePeople/>
                {loading? <Loader/>: <People onSubmit={this.peopleSubmit}/>}

            </div>
                
        )
    }

    peopleSubmit=(value)=>this.props.addPeople(value)
}

export default connect(state => ({
    loading: state[modyleName].loading
}), {addPeople})(Peple)