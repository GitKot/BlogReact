import React, {Component} from 'react'
import PersonCard from '../People/personCard'
import PersonList from '../People/personList';
import EventList from '../events/Virtualize'
import SelectedEvents from '../events/selectedEvents'
import GarbageBox from '../events/GarbageBox';

class adminRouts extends Component {
    render(){
        return (
            <div>
                <GarbageBox/>
                <h1>Admin page</h1>
                <PersonList/>
                <SelectedEvents/>
                <EventList/>
            </div>
        )
    }
}

export default adminRouts