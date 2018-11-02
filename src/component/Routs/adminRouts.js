import React, {Component} from 'react'
import PersonCard from '../People/personCard'
import PersonList from '../People/personList';

class adminRouts extends Component {
    render(){
        return (
            <div>
                <h1>Admin page</h1>
                <PersonList/>
            </div>
        )
    }
}

export default adminRouts