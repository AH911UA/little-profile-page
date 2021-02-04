import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';

export const UserImageContext = React.createContext({}); 

const fileImage = {
    name: '',
    path: '',
    message: 'AIzaSyC8XU8fOk4UJUNadaVVHzCQcjtfIpUZVCU' // Base64url formatted string
};

 export default function UserImageProvider ({ children }) {
     const [image, setImage] = useState(fileImage);
   
    function saveImage() {        
        firebase.storage().ref.putString(image.message, image.path)
            .then((snapshot) => console.log('Uploaded a base64url string!'));
    }
     
    return(
        <UserImageContext.Provider value={{
            image, setImage,
            saveImage
        }}>
            { children }
        </UserImageContext.Provider>
    )
};

