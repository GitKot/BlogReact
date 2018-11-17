 import React, {Component} from 'react'
 import {DropTarget} from 'react-dnd'
 import {connect} from 'react-redux'
 import {addEventToPeople, peoplelistSelector} from '../../ducks/people'

 class EventCart extends Component {
 static propTypes = {
 }
  render(){
      const {connectDropTarget, canDrop, hovered, people} = this.props
      const {title, where, wen} = this.props.events

      const dropStyle = {
          border: `1px solid ${canDrop ? 'red':'black'}`,
          backgroundColor: hovered ? 'green': 'white'
          }
      const peopleElement = people && (
           <p>
           {people.map(person => person.email).join(',  ')}
           </p>) 
             
           
    return connectDropTarget(
            <div style = {dropStyle}>
                <h3>{title}</h3>
                <p>{where},{wen}</p>
                {peopleElement}
            </div>
           )
 }}

 const spec = {
    drop(props, monitor) {
        const personUid = monitor.getItem().uid
       
        const eventUid = props.events.uid
     
        props.addEventToPeople(eventUid, personUid)

        return { eventUid }
    }
 }

 const collect=(connect, monitor)=> ({
      connectDropTarget: connect.dropTarget(),
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver()
 })

 export default connect((state, props) => ({
    people: peoplelistSelector(state).filter(peopl =>
            peopl.events.includes(props.events.uid) )
        }), {addEventToPeople})(DropTarget(['people'], spec, collect)(EventCart))