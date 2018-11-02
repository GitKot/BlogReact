 import React, {Component} from 'react'
 import PropTypes from 'prop-types'
 import { List } from 'react-virtualized'
 import {connect} from 'react-redux'
 import {peoplelistSelector, fetchOllPeople} from '../../ducks/people'
import PersonCard from './personCard';

 class PersonList extends Component {
 static propTypes = {
 }

 componentDidMount(){
     this.props.fetchOllPeople()
 }
  render(){
      console.log('_______', this.props.people)
    return( <List
        width={300}
        height={300}
        rowCount={this.props.people.length}
        rowHeight={100}
        rowRenderer={this.rowRenderer}
      />
           )
 }
 rowRenderer = ({index, key, style}) => <PersonCard people = {this.props.people[index]} key = {key} style = {style} />
 }


 export default connect(state =>({
     people: peoplelistSelector(state)
 }), {fetchOllPeople})(PersonList)