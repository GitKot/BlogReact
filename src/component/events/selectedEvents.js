 import React, {Component} from 'react'
 import {selectedEventsSelector} from '../../ducks/events'
 import {connect} from 'react-redux'
 import EventCart from './eventCartSelect'
 

 class SelectedEvents extends Component {

  render(){
    return(
            <div>
                {this.props.events.map(event => <EventCart events = {event} key = {event.uid}/>)}
            </div>
           )
 }}


 export default connect(state =>({
    events:selectedEventsSelector(state)
 }))(SelectedEvents)