 import React, {Component} from 'react'
 import {connect} from 'react-redux'
 import {moduleName} from '../../ducks/events'

 class dragPreviewEvent extends Component {
 
  render(){
      const {uid} = this.props
      const {title} = this.props.event.get(uid)
      
    return(
            <div>
                {title}
            </div>
           )
 }}


 export default connect((state, props)=>({
     event: state[moduleName].entities
 }))(dragPreviewEvent)