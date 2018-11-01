import React, {Component} from 'react'
import {connect} from 'react-redux'
import {moduleName} from '../../ducks/events'
import {fetchLazy, eventListSelectors, selectEvent} from '../../ducks/events'
import Loader from '../common/Loader'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import 'react-virtualized/styles.css'


export class EventList extends Component {
   
 
   componentDidMount(){
      this.props.fetchLazy()
   }
   
   render(){
       const {loading, eventlist} = this.props
    //    if (loading) return <Loader/>
       return(
           <InfiniteLoader
                loadMoreRows = {this.loadMoreRows}
                isRowLoaded={this.isRowLoded}
                rowCount={this.props.eventlist.length + 1}
                
           >
               {({onRowsRendered, registerChild})=>
               <Table 
                    ref = {registerChild}
                    rowCount =  {eventlist.length} 
                    rowGetter = {this.rowGetter}
                    onRowClick={this.handleRowClick}
                    onRowsRendered ={onRowsRendered}
                    rowHeight = {40}
                    headerHeight = {50}
                    overscanRowCount = {5}
                    width ={700}
                    height={300}
               >
                    <Column
                            label="title"
                            dataKey="title"
                            width= {150}
                    />
                    <Column
                            label="where"
                            dataKey="where"
                            width= {250}
                    />
                    <Column
                            label="when"
                            dataKey="month"
                            width= {150}
                    />
                   
               </Table> 
               }
            </InfiniteLoader>   
           )
   }
   rowGetter = ({index}) => {
        return this.props.eventlist[index]
   }
   
   loadMoreRows = () => {
       console.log('___', 'load more')
       this.props.fetchLazy()
   }

   isRowLoded = ({ index }) => index < this.props.eventlist.length

   handleRowClick = (rowData) =>  {
       
       const {selectEvent} = this.props
       selectEvent && selectEvent(rowData.uid)
   } 
}


   export default connect( state => ({
        eventlist: eventListSelectors(state),
        loading:state[moduleName].loading
   }), {fetchLazy, selectEvent})(EventList)