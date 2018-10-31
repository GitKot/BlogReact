import conferences from './conferences'
import firebase from 'firebase'

export function saveEventToFB() {
    const eventsRef = firebase.database().ref('/events')
    conferences.forEach(conference => eventsRef.push(conference))
}



export const runMigration = function(){
    console.log(33333)
    firebase.database().ref('/events').once('value', data => {
        if(!data.val()) saveEventToFB()
    })
}





