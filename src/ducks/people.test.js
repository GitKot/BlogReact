import {addPersonSaga, ADD_PEOPLE, ADD_PEOPLE_REQUEST} from './people'
import {call, put} from 'redux-saga/effects'
import {generateId} from './utils'

it('should dispatch person with id', () => {
    const person = {
        firstname:'Andry',
        lastname:'Andry',
        email:'test@mail.com'
       
    }

    const saga = addPersonSaga({
        type: ADD_PEOPLE_REQUEST, 
        payload: person
    })

    expect(saga.next().value).toEqual(call(generateId))

    const id = generateId()
    expect(saga.next(id).value).toEqual(put({
        type: ADD_PEOPLE,
        payload: {id, ...person}
    }))

})