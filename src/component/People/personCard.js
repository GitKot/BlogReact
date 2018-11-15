 import React, {Component} from 'react'
 import {DragSource} from 'react-dnd'
 import {getEmptyImage} from 'react-dnd-html5-backend'


 class personCard extends Component {
  
    componentDidMount(){
        this.props.connectPreview(getEmptyImage()) // убрали стандартную html  preview
    }
    
  render(){
      const {people, style, connectDragSource, isDragging } = this.props
      const draggStyle = {
          backgroundColor: isDragging ? 'grey': 'white'
      }
    return (
            <div style={{width:300, height: 200, ...draggStyle, ...style}}>
            {connectDragSource(<h3>{people.firstname}&nbsp:{people.lastname}</h3>)}
            <p>{people.email}</p>
            </div>
           )
 }}

 const spec = {
     beginDrag(props){
        return {
            uid: props.people.uid
        }
     },
     endDrag(props, monitor){
        const personUid = props.people.uid
        const dropResult = monitor.getDropResult()
        const eventUid = dropResult && dropResult.eventUid
        
     }
 }

 const collect = (connect, monitor) => ({
     connectDragSource: connect.dragSource(),
     isDragging: monitor.isDragging(),
     connectPreview: connect.dragPreview()
 })
 export default  DragSource('people', spec, collect)(personCard)