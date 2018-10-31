import React, {Component} from 'react'
import EvenList from '../../component/events/EventList'

class EventsPage extends Component {
    render(){
        console.log(this.props.events)
        return(
            <div>Events Page
            <EvenList/>
            </div>
        )
    }
}

export default EventsPage