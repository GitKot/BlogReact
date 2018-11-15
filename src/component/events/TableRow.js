 import React, {Component} from 'react'
 import {DragSource} from 'react-dnd'
 import {defaultTableRowRenderer} from 'react-virtualized'
 import {getEmptyImage} from 'react-dnd-html5-backend'

 class TableRow extends Component {
 
  componentDidMount(){  //delete nativ html drag preview
      this.props.connectPreview(getEmptyImage())
  }

  render(){
      const {connectDragSource, ...rest} = this.props
    return connectDragSource(defaultTableRowRenderer(rest))
 }}
 
 const spec = {
     beginDrag(props){
       return{
           uid: props.rowData.uid
       }
     }
 }

 const collect = (connect, monitor) => ({
    connectDragSource:connect.dragSource(),
    connectPreview: connect.dragPreview()
 })

 export default DragSource('event', spec, collect)(TableRow)