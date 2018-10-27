import React from "react"
import {appName} from '../config'
import { List, Record } from "immutable";


export const modyleName = 'people'
export const ADD_PEOPLE= `${appName}/ADD_PEOPLE`


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
        return state.update('entities', (entities)=> entities.push(new PersonRecord(payload.persone)) ) 

        default:return state
    }

}

export function  addPeople(persone){
    return (dispatch)=> {
            dispatch({
                type:ADD_PEOPLE,
                payload:{
                    persone: { id:Date.now(), ...persone }
                }
            })
    }
} 