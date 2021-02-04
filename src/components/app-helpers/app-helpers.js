import React, { useContext } from 'react';
import firebase from 'firebase';

// export function GetUser(email) {

//     console.log("USER ----> ", email);

//     let userRef = firebase.database().ref('users/' + ReplaseSymbol(email));

//     return new Promise((res, rej) => {
//         userRef.on('value', (snapshot) => {
//             res(snapshot.val());
//         });
//     })
   
    
// }

export function ReplaseSymbol(str)
{
    return str.replace(/\W/g, '');
}
