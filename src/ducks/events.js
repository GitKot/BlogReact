import {all, take, call, put, select} from 'redux-saga/effects'
import {Record, OrderedMap, OrderedSet} from 'immutable'
import {appName} from '../config'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {fbDataToEntities} from '../ducks/utils'


/**Constants**/
export const moduleName = 'event'
const prefix = `${appName}/${moduleName}`

export const FETCH_OLL_REQUEST = `${prefix}/FETCH_OLL_REQUEST`
export const FETCH_OLL_SUCCESS = `${prefix}/FETCH_OLL_SUCCESS`
export const FETCH_OLL_ERROR = `${prefix}/ERROR`
export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`
export const SELECT_EVENT = `${prefix}/SELECT_EVENT`

export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false,
    selected: new OrderedSet([])
})

export const EventRecord = Record({
    uid: null,
    title: null,
    url: null,
    where: null,
    when: null,
    month: null,
    submissionDeadline: null
})

/**Reducer**/
export  default function  reducer(state = new ReducerRecord() , action){
    const {type, payload} = action
    switch (type){
    case FETCH_OLL_REQUEST:
    case FETCH_LAZY_START:
                return state.set('loading', true)
                            
    case FETCH_OLL_SUCCESS:
  
        return state
                 .set('loading', false)
                 .set('loaded', true)
                 .set('entities', fbDataToEntities(payload, EventRecord) )
    
    case FETCH_LAZY_SUCCESS:
    console.log(22)
        return state 
              .set('loading', false)
              .mergeIn(['entities'], fbDataToEntities(payload, EventRecord))
              .set('loaded', Object.keys(payload).length < 10)

    case SELECT_EVENT:

        return state.selected.contains(payload.uid)
                    ? state.update('selected', selected => selected.remove(payload.uid))
                    : state.update('selected', selected => selected.add(payload.uid))
               
    default: return state
}}


/**Action Creators**/
    export function fetchOll(){
        return{
            type:FETCH_OLL_REQUEST,
            }
    }

    export function selectEvent(uid){
        return {
            type: SELECT_EVENT,
            payload: {uid}
        }
    }

    export function  fetchLazy() {
        return {
            type:FETCH_LAZY_REQUEST
        }
    }

 /** SELECTORS**/

    export const stateSelector = state => state[moduleName]
    export const entitiesSelector = createSelector(stateSelector, state => state.entities)
    export const eventListSelectors = createSelector(entitiesSelector, entities => (
        entities.valueSeq().toArray()
    ))


/** SAGA **/

export const fetchOllSaga = function* (){
    while(true){ 
        yield take(FETCH_OLL_REQUEST)
        const ref = firebase.database().ref('events')
        const data = yield call([ref, ref.once], 'value')
        yield put({
            type:FETCH_OLL_SUCCESS,
            payload: data.val()
        })
}}


export const fetchLazySaga = function* (){
    while(true){
        yield take(FETCH_LAZY_REQUEST)

        const state = yield select(stateSelector)
        const lastEvent = state.entities.last()
        if(state.loading || state.loaded) continue

        yield put({
            type:FETCH_LAZY_START 
        })
        
        const ref = firebase.database().ref('events')
            .orderByKey()
            .limitToFirst(10)
            .startAt(lastEvent ? lastEvent.uid: "")
        
        const data = yield call([ref, ref.once], 'value')
        
        yield put({
            type:FETCH_LAZY_SUCCESS,
            payload: data.val()
            })
    }
}



export const saga = function*(){
    yield all([
        fetchOllSaga(),
        fetchLazySaga()
    ])
}