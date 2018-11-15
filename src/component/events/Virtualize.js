import React, {Component} from 'react'
import {connect} from 'react-redux'
import {moduleName} from '../../ducks/events'
import {fetchLazy, eventListSelectors, selectEvent} from '../../ducks/events'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import 'react-virtualized/styles.css'
import {DragSource} from 'react-dnd'
import TableRow from './TableRow';

export class EventList extends Component {
   
 
   componentDidMount(){
      this.props.fetchLazy()
   }
   
   render(){
       const {loading, eventlist} = this.props
      
    //    if (loading) return <Loader/>
       return (
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
                    rowRenderer={this.getRowRenderer}
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

   getRowRenderer = (rowCtx)=> < TableRow {...rowCtx}/>

   rowGetter = ({index}) => {
            return this.props.eventlist[index]
   }
   
   loadMoreRows = () => {
          this.props.fetchLazy()
   }

   isRowLoded = ({ index }) => index < this.props.eventlist.length

   handleRowClick = ({rowData}) =>  {
       const {selectEvent} = this.props
       selectEvent && selectEvent(rowData.uid)
   } 
}



   export default connect( state => ({
        eventlist: eventListSelectors(state),
        loading:state[moduleName].loading
   }), {fetchLazy, selectEvent})(EventList)