import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer from '../ducks/auth'
import {moduleName as authModule} from '../ducks/auth'
import {modyleName as peopleModuleName} from '../ducks/people'
import peopleReducer from '../ducks/people'

const reducer = combineReducers({
    router, form, 
    [authModule]:authReducer,
    [peopleModuleName]:peopleReducer 
})

export default reducer