import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';


import { BrowserRouter } from "react-router-dom";
import UserContextProvider from './components/app-user-profile/app-user-profile-context';
import PostsContextProvider from './components/app-posts/app-posts-create/app-post-create-context';



const fbConfig = {
  apiKey: "AIzaSyC8XU8fOk4UJUNadaVVHzCQcjtfIpUZVCU",
  authDomain: "shop-a072b.firebaseapp.com",
  databaseURL: "https://shop-a072b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shop-a072b",
  storageBucket: "shop-a072b.appspot.com",
  messagingSenderId: "41689435535",
  appId: "1:41689435535:web:cd04f99e993d4714fdcffa",
  measurementId: "G-V2J757LTEC"
};

firebase.initializeApp(fbConfig);


ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <PostsContextProvider>
        <App />
        </PostsContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
