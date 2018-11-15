 import React, {Component} from 'react'
 import {DropTarget} from 'react-dnd'
 import {connect} from 'react-redux'
 import {deleteEvent} from '../../ducks/events'
 import {moduleName} from '../../ducks/events'
 import Loader from '../common/Loader'


const style = {
    width:'8vmax',
    height:'10vmax',
    backgroundColor : 'green',
    position:'fixed',
    top:'5vmax',
    right:'5vmax',
    zIndex: 1000
}

 class GarbageBox extends Component {
 
  render(){
    const {connectDropTarget, canDrop, loading} = this.props
    const dropstyle = {...style, outline: `4px solid ${canDrop? "green": "blue" }` }
    const loader = loading ? <Loader/>: null
    return connectDropTarget(
            <div style = {dropstyle}>
            TRASH
            {loader}
            </div>
           )
 }}
const spec = {
    drop(props, monitor){
    const item =  monitor.getItem()
    props.deleteEvent(item.uid)
  }
}

const collect = (connect, monitor) =>({
      connectDropTarget: connect.dropTarget(),
      canDrop: monitor.canDrop()

})



 export default connect(state => ({
   loading:state[moduleName].loading
 }), {deleteEvent})(DropTarget('event', spec, collect)(GarbageBox))