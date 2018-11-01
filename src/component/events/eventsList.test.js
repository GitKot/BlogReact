import React from 'react'
// import {shallow} from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import events from '../../mocks/conferences'

import {EventList} from './TableEventList'
import Loader from '../common/Loader'
import {EventRecord} from '../../ducks/events'
import { Iterable } from 'immutable';

// Enzyme.configure({ adapter: new Adapter() });

// const testEvent = events.map(event =>  ({...event, uid: Math.random().toString()}))

// it('should render loader', () => {

//     const container = shallow(<EventList loading/>)

//     expect(container.contains(<Loader/>))
// })


// it('should render event list', ()=> {
//     const container = shallow(<EventList events = {testEvent}/>)
//     const row = container.find('.test-event-list_row')
//     expect(row.length).toEquel(testEvent.length)
// })

// it('should request fetch data', (done) => {
//     mount(<EventList events = {[]} fetchAll={done}/>)
// })