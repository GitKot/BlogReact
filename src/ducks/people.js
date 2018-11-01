import React from "react"
import {appName} from '../config'
import { List, Record, OrderedMap } from "immutable";
import {put, takeEvery,take, call, all,  select} from 'redux-saga/effects'
import {generateId} from './utils'
import {reset} from 'redux-form'
import firebase from 'firebase'
import {fbDataToEntities} from '../ducks/utils'
import {createSelector} from 'reselect'

export const modyleName = 'people'
export const prefix = `${modyleName}/${appName}`

export const ADD_PEOPLE_SUCCESS= `${prefix}/ADD_PEOPLE_SUCCESS`
export const ADD_PEOPLE_REQUEST = `${prefix}/ADD_PEOPLE_REQUEST`
export const ADD_PEOPLE_ERROR = `${prefix}/ADD_PEOPLE_ERROR`

export const FETCH_OLL_PEOPLE_REQUEST = `${prefix}/FETCH_OLL_PEOPLE_REQUEST`
export const FETCH_OLL_PEOPLE_SUCCESS =  `${prefix}/FETCH_OLL_PEOPLE_SUCCESS`
export const FETCH_OLL_PEOPLE_ERROR =  `${prefix}/FETCH_OLL_PEOPLE_ERROR`


const ReducerState = Record({
    entities: OrderedMap({}),
    loading: false
})

const PersonRecord = Record({
    uid: null,
    firstname: null,
    lastname: null,
    email:null
})

export default function reducer(state = new ReducerState(), action){
    const {type, payload} = action
    switch (type){
        case FETCH_OLL_PEOPLE_REQUEST:
        case ADD_PEOPLE_REQUEST:
            return state.set('loading', true)

        case ADD_PEOPLE_SUCCESS:
                 return state.set('loading', false)
                        .setIn(['entities', payload.uid], 
                                    new PersonRecord(payload)  )

        case FETCH_OLL_PEOPLE_SUCCESS:
                return state
                       .set('loading', false)
                       .set('entities', fbDataToEntities(payload, PersonRecord))
                               
        
        

        default:return state
    }

}

/**AC**/
export function fetchOllPeople(){
    return {
        type: FETCH_OLL_PEOPLE_REQUEST
    }
}

export function addPeople(person){
    
    return{
        type:ADD_PEOPLE_REQUEST,
        payload:person
    }
}


/** SELECTORS**/
export const setateSelector = state => state[modyleName]
export const entitiesSelector = createSelector(setateSelector, state => state.entities)
export const peoplelistSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())



/**SAGA */
export const addPersonSaga = function*(action){
      const peopleref = firebase.database().ref('people')
    try{
        const ref = yield call([peopleref, peopleref.push], action.payload)
        
        yield put({
            type: ADD_PEOPLE_SUCCESS,
            payload:{...action.payload, uid:ref.key}
        })
      
         yield put(reset('person'))
    }catch(error){
        yield put({
            type: ADD_PEOPLE_ERROR,
            payload: error
        })
    }
 
}

export const fetchOllPeopleSaga = function* (){
   
    const peopleRef = firebase.database().ref('people')
    try{
        const data = yield call([peopleRef, peopleRef.once], 'value')
        yield put({
            type:FETCH_OLL_PEOPLE_SUCCESS,
            payload: data.val()
        })
    }catch(error){
        yield put({
            type:FETCH_OLL_PEOPLE_ERROR,
            payload:error
        })
    }
   
}

export const saga = function*() {
    yield all([
        takeEvery(ADD_PEOPLE_REQUEST, addPersonSaga),
        takeEvery(FETCH_OLL_PEOPLE_REQUEST, fetchOllPeopleSaga)
])
}