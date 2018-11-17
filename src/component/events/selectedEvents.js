 import React, {Component} from 'react'
 import {selectedEventsSelector} from '../../ducks/events'
 import {connect} from 'react-redux'
 import EventCart from './eventCartSelect'
 import {TransitionMotion, spring} from 'react-motion'
 

 class SelectedEvents extends Component {

  render(){
    return <TransitionMotion
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnrer}
            >
            
            { (interpolated) => <div>
                {
                interpolated.map( config => <div 
                      style = {config.style} key = {config.key}>
                     <EventCart events = {config.data}/>
                      </div>)
                      }
            </div>
            }
    </TransitionMotion>   
 }
 willEnrer = () => ({
     opacity: 0
 })
 willLeave = () => ({
     opacity: spring(0, {stiffness: 50})
 })

 getStyles(){
     return this.props.events.map(event => ({
         style:{
             opacity:spring(1, {stiffness: 50})
         },
         key:event.uid,
         data:event
     }))
 }
}


 export default connect(state =>({
    events:selectedEventsSelector(state)
 }))(SelectedEvents)