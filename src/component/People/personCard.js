 import React, {Component} from 'react'
 import PropTypes from 'prop-types'


 class personCard extends Component {
 static propTypes = {
 }
  render(){
      const {people, style} = this.props
      console.log(33333333333, people, style)
    return(
            <div style={{width:300, height: 200, ...style}}>
            <h3>{people.firstname}&nbsp:{people.lastname}</h3>
            <p>{people.email}</p>
            </div>
           )
 }}
 export default  personCard