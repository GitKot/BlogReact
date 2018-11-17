 import React, {Component} from 'react'
 import {DropTarget} from 'react-dnd'
 import {connect} from 'react-redux'
 import {deleteEvent} from '../../ducks/events'
 import {moduleName} from '../../ducks/events'
 import Loader from '../common/Loader'
 import {Motion, spring, presets} from 'react-motion'



 class GarbageBox extends Component {
 
  render(){
    const {connectDropTarget, isOver, loading} = this.props
   const style = {
      outline: `4px solid ${isOver? "green": "blue" }`, 
        width:'8vmax',
        height:'10vmax',
        backgroundColor : 'green',
        position:'fixed',
        top:'5vmax',
        right:'5vmax',
        zIndex: 1000
    }
  
    return <Motion defaultStyle = {{opacity:0}}
                    style={{opacity:spring(1, {...presets.noWobble,
                    stiffness: presets.noWobble.stiffness/20})}}>
            {interpolatedStyle  => connectDropTarget(
                <div style = {{...style, ...interpolatedStyle}}>
                  TRASH
                  {loading && <Loader/>}
                </div>
            )}
           </Motion>
 }}
const spec = {
    drop(props, monitor){
    const item =  monitor.getItem()
    props.deleteEvent(item.uid)
  }
}

const collect = (connect, monitor) =>({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()

})



 export default connect(state => ({
   loading:state[moduleName].loading
 }), {deleteEvent})(DropTarget('event', spec, collect)(GarbageBox))