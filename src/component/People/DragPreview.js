 import React, {Component} from 'react'
 import {connect} from 'react-redux'
 import {personSelector} from '../../ducks/people'

 class PersonCardDragPreview extends Component {
 static propTypes = {
 }
  render(){
      console.log('8888888',this.props.person)
    return(
            <div>
                <h1>{this.props.person.firstname}</h1>
            </div>
           )
 }}


 export default connect((state, props) =>({
     person: personSelector(state, props)
 }))(PersonCardDragPreview)