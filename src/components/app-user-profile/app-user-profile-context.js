import React, { useState } from 'react';
import firebase from 'firebase';
import {ReplaseSymbol} from '../app-helpers/app-helpers';
export const UserContext = React.createContext({});

const userData = {
        id: '',
        email: '',
        isLogin: false,
        name: 'Alex',
        aboutMe: 'I love to watch the sea and listen to the tide of the waves.',
        isAva: false,
        imageAva: '',
        qPosts: [0]
};

export default function UserContextProvider({ children })
{
        const [user, setuser] = useState(userData);
        
        function loadProfile() {

                return new Promise((res, rej) =>
                        firebase.database().ref(`users/${user.id}`)
                                .on('value', (snapshot) => {
                                        const tmp = snapshot.val();
                                        setuser(Object.assign(user, tmp, { isLogin: true }));
                                        return res();
                                }));
        }

        function sendEdit(userName, userAbout, userAva) {
                const id = user.email.replace(/\W/g, '');
                console.log(userAva);
                setuser(Object.assign(user, {
                        id: id,
                        name: userName,
                        aboutMe: userAbout,
                        imageAva: userAva 
                }));
                
                console.log(user);

                firebase.database().ref(`users/${id}`).set(user);
        }

        function singin(password) {
                return firebase.auth().signInWithEmailAndPassword(user.email, password)
                        .then(u => {
                                const id = ReplaseSymbol(user.email);
                                setuser(Object.assign(user, { id: id, isLogin: true }));
                                return loadProfile();
                        })
                        .catch(error => {
                                console.log(`----sing in-----> ${error}`);
                                return false;
                        });
        }

        function login(password) {
                firebase.auth().createUserWithEmailAndPassword(user.email, password)
                        .then(u => {
                                const id = ReplaseSymbol(user.email);
                                setuser({ user, id: id, isLogin: true });
                                return true;
                        })
                        .catch(error => {
                                console.log(`----sing in-----> ${error}`);
                                return false;
                        });
        }

        function signOut() {
                 firebase.auth().signOut().then(() => {
                        return false;
                 }).catch(error => {
                        console.log(error);
                        return true;
                 });    
        }

        return (
                <UserContext.Provider
                        value={{
                                user, setuser,
                                loadProfile, signOut, login, singin, sendEdit
                        }}
                >
                        { children }
                </UserContext.Provider>
        );
}

 
 