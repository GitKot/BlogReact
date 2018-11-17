import {appName} from '../config'
import firebase from 'firebase'
import {Record} from 'immutable'
import {all, take, call, put, cps, takeEvery, spawn} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {eventChannel} from 'redux-saga'

const ReducerRecord =  Record({
    user:null,
    error:null,
    loading:false
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`


export default function (state = new ReducerRecord(), action){
    const {type, payload, error} = action

    switch (type){
        case SIGN_IN_REQUEST :
        case SIGN_UP_REQUEST :
         return state.set('loading', true)

        case SIGN_IN_SUCCESS:
       
          return state.set('loading', false)
                      .set('user', payload.user)
                      .set('error', null)
        case SIGN_UP_ERROR:
        case SIGN_IN_ERROR:
            return state.set('error', error )
                        .set('loading', false)

        case SIGN_OUT_SUCCESS :
            return new ReducerRecord() 
    default: return state
    }
}


/** AC **/

export function signUp(email, password){
    return {
            type:SIGN_UP_REQUEST,
            payload: {email, password}
    }}
  
export function signIn(email, password){
    return {
        type: SIGN_IN_REQUEST,
        payload: {email, password}
        }
}    

export function signOut(){
    return {
        type:SIGN_OUT_REQUEST
    }
}

/** SAGA **/

export const signUpSaga = function* (action ){
    const auth =  firebase.auth()
    console.log('SIGN_UP_REQUEST')
    try{
        const user = yield call([auth, auth.createUserWithEmailAndPassword],
                               action.payload.email, action.payload.password ) 
                  
                    yield put({
                            type: SIGN_IN_SUCCESS,
                            payload:{user}
                    })
    }catch(error){
            yield put({
                type:SIGN_UP_ERROR
            })
    }
}

export const signInSaga = function * (){
    const auth = firebase.auth()
    while(true){
        const action = yield take(SIGN_IN_REQUEST)
        
        try{
          const user = yield call(
            [auth, auth.signInWithEmailAndPassword],
            action.payload.email, action.payload.password
           )
          
           yield put({
                type:SIGN_IN_SUCCESS,
                payload: {user}
    })
         }catch(error){
             yield put({
                 type: SIGN_IN_ERROR,
                 error
            })
         }

    }
}


export const signOutSaga = function* (){
    const auth = firebase.auth()
    try{
        yield call([auth, auth.signOut])
    }catch(error){
    }
}
// create chanel to auth
// emmit this aur subscriber
const createAuthChanel = () => eventChannel( emmit => {
      return  firebase.auth().onAuthStateChanged(user => emmit({user}))
})

export const watchStatusChange = function*() {
       const chan = yield call(createAuthChanel)
       while(true){
           const {user} = yield take(chan)
       
           if(user){
               yield put({
                   type:SIGN_IN_SUCCESS,
                   payload: {user}
               })
           }else{
               console.log('SIGN_OUT_SUCCESS')
               yield put({
                   type: SIGN_OUT_SUCCESS,
                   payload: {user}
               })
               yield put(push('/auth/signin'))
           }
       }
}

export const saga = function*(){
    yield spawn(watchStatusChange)
    yield all([
        takeEvery(SIGN_UP_REQUEST, signUpSaga),
        signInSaga(),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ])
} 