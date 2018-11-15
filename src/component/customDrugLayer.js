 import React, {Component} from 'react'
 import {DragLayer} from 'react-dnd'
 import PersonCardDragPreview from './People/DragPreview'
 import DragPrevievEvent from './events/DragPreviewEvent'

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
     people: PersonCardDragPreview,
     event: DragPrevievEvent
 }


 class CustomDeagLayer extends Component {

  getItemComp(){
      const {offset, item, itemType} = this.props
      const PreviewComponent = previewMap[itemType];
     
      if(!offset || !PreviewComponent) return null;
      const {x, y} = offset
      const style = {
          transform: `translate(${x}px, ${y}px)`
      }; 
      
      return <div style = {style}><PreviewComponent {...item}/></div>
  }

  render(){

      const {isDragging} = this.props
      if(!isDragging) return null
      const item = this.getItemComp()
      if(!item) return null

    return(
            <div style = {layerStyle}>
            {item}
            </div>
           )
 }}

  const collect = (monitor) => ({
    isDragging: monitor.isDragging(), // 
    offset: monitor.getSourceClientOffset(), // offset title dragable objekt
    item: monitor.getItem(), //get property dragabl objekt
    itemType: monitor.getItemType() //get type dragabl objekt
  })

 export default DragLayer(collect)(CustomDeagLayer)

 // komponent will be connect to root layer