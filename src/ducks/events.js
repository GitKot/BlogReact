import {all, take, call, put} from 'redux-saga/effects'
import {Record, OrderedMap} from 'immutable'
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

export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
})

const EventRecord = Record({
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
                return state.set('loading', true)
                            
    case FETCH_OLL_SUCCESS:
  
         return state
                 .set('loading', false)
                 .set('loaded', true)
                 .set('entities', fbDataToEntities(payload, EventRecord) )

               
    default: return state
}}


/**Action Creators**/
    export function fetchOll(){
        return{
            type:FETCH_OLL_REQUEST,
            }
    }

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

/** SELECTORS**/

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, sta => sta.entities)
export const eventListSelectors = createSelector(entitiesSelector, entities => (
    entities.valueSeq().toArray()
))



export const saga = function*(){
    yield all([
        fetchOllSaga()
    ])
}