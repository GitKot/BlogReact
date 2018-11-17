import React , {Component} from 'react'

import {Table, Column} from 'react-virtualized'
import 'react-virtualized/styles.css'
import {connect} from 'react-redux'
import {fetchOllPeople, peoplelistSelector} from '../../ducks/people'
import {Motion, spring, presets} from 'react-motion'

class TablePeople extends Component {

    componentDidMount(){
        this.props.fetchOllPeople && this.props.fetchOllPeople()
    }
    
    componentDidUpdate({people}){
        if(people.length && this.props.people.length > people.length){
            setTimeout(()=> {
                this.table.scrollToRow(this.props.people.length)
            }, 0)
        }
    }
    render(){
        const {people} = this.props
        console.log('people people', people)
        return(
          
            <Table
                rowCount =  {people.length}
                rowGetter = {this.rowGetter} 
                rowHeight = {50}
                headerHeight = {50}
                width ={450}
                height={300}
                ref={this.setListRef}
            >
                <Column
                label="firstname"
                dataKey="firstname"
                width={150}
                />
                <Column
                label="lastname"
                dataKey="lastname"
                width={150}
                />
                <Column
                dataKey="email"
                label="email"
                width={150}
                />
            </Table>
        )
    }
    rowGetter = ({index}) => this.props.people[index]
    
    setListRef = ref => this.table = ref
}

export default connect(state => ({
    people: peoplelistSelector(state)
   
}), {fetchOllPeople})(TablePeople)