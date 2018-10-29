import React from "react"
import {appName} from '../config'
import { List, Record } from "immutable";
import {put, takeEvery, call} from 'redux-saga/effects'
import {generateId} from './utils'

export const modyleName = 'people'
export const prefix = `${modyleName}/${appName}`

export const ADD_PEOPLE= `${prefix}/ADD_PEOPLE`
export const ADD_PEOPLE_REQUEST = `${prefix}/ADD_PEOPLE_REQUEST`


const ReducerState = Record({
    entities: new List([])
})

const PersonRecord = Record({
    id: null,
    firstname: null,
    lastname: null,
    email:null
})

export default function reducer(state = new ReducerState(), action){
    const {type, payload} = action
    switch (type){
        
        case ADD_PEOPLE :
        return state.update('entities', (entities)=> 
                            entities.push(new PersonRecord(payload)) ) 

        default:return state
    }

}

// export function  addPeople(persone){
//     return (dispatch)=> {
//             dispatch({
//                 type:ADD_PEOPLE,
//                 payload:{
//                     persone: { id:Date.now(), ...persone }
//                 }
//             })
//     }
// } 

export function addPeople(person){
    return{
        type:ADD_PEOPLE_REQUEST,
        payload:person
    }
}

export const addPersonSaga = function*(action){
    const id = yield call(generateId)
    yield put({
        type:ADD_PEOPLE,
        payload: {...action.payload, id}
    })
}

export const saga = function*() {
    yield takeEvery(ADD_PEOPLE_REQUEST, addPersonSaga)
}