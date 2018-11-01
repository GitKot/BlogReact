 import React, {Component} from 'react'
 import {connect} from 'react-redux'
 import {moduleName} from '../../ducks/events'
 import {fetchOll, eventListSelectors, selectEvent} from '../../ducks/events'
 import Loader from '../common/Loader'

 export class EventList extends Component {
    
  
    componentDidMount(){
       this.props.fetchOll()
    }
    
    render(){
        const {eventlist, loading} = this.props
        console.log('_______',  eventlist)
        if (loading) return <Loader/>
        return(
            <div>
                <table>
                    <tbody>
                    {this.getTbody()}
                    </tbody>
                </table>    
            </div>   
            )
    }
    getTbody(){
        return this.props.eventlist.map(this.getEvent )
    }
    getEvent = (event) => {
    return <tr key={event.uid} onClick={this.handleRowClick(event.uid)}>
                <td>{event.title}</td>
                <td>{event.where}</td>
                <td>{event.month}</td>
           </tr>
    }

    handleRowClick = (uid) => () => {
        console.log('event', uid)
        const {selectEvent} = this.props
        selectEvent && selectEvent(uid)
    } 
}


    export default connect( state => ({
         eventlist: eventListSelectors(state),
         loading:state[moduleName].loading
    }), {fetchOll, selectEvent})(EventList)