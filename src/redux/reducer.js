import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer from '../ducks/auth'
import {moduleName as authModule} from '../ducks/auth'
import {modyleName as peopleModuleName} from '../ducks/people'
import peopleReducer from '../ducks/people'
import eventsReducer from '../ducks/events'
import {moduleName as eventModule} from '../ducks/events'

const reducer = combineReducers({
    router, form, 
    [authModule]:authReducer,
    [peopleModuleName]:peopleReducer,
    [eventModule]:eventsReducer
})

export default reducer