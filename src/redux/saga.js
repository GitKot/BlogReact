import {saga as peopleSaga} from '../ducks/people'
import {all} from 'redux-saga/effects'
import {saga as authSaga} from '../ducks/auth'
import {saga as eventSaga} from '../ducks/events'

export default function* rootSaga(){
    yield all([
        peopleSaga(), authSaga(), eventSaga()
     ] )
}