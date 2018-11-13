 import React, {Component} from 'react'
 import {DragLayer} from 'react-dnd'
 import PersonCardDragPreview from './People/DragPreview'

  const layerStyle = {
      position: 'fixed',
      pointerEvents: 'none',
      left:0,
      top:0,
      width:'100%',
      height:'100%',
      zIndex:1000
  }
 const previewMap = {
     people: PersonCardDragPreview
 }
 class CustomDeagLayer extends Component {

  getItem(){
      const {offset, item, itemType} = this.props
      console.log('itemtype', itemType)
      const {x, y} = offset
      const style = {
          transform: `translate(${x}px, ${y}px)`
      };
      const PreviewComponent = previewMap[itemType];
      console.log('previevComponent' , PreviewComponent)
      if(!offset || !PreviewComponent) return null;
      console.log('previevComponent' , PreviewComponent)
      return <div style = {style}><PreviewComponent {...item}/></div>
  }

  render(){

      const {isDragging} = this.props
      if(!isDragging) return null
      const item = this.getItem()
      if(!item) return null

    return(
            <div style = {layerStyle}>
            {item}
            </div>
           )
 }}

  const collect = (monitor) => ({
    isDragging: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),
    item:monitor.getItem(),
    itemType: monitor.getItemType()
  })

 export default DragLayer(collect)(CustomDeagLayer)