import React, { useState, useContext, useEffect } from 'react';
import AppNavbar from '../app-navbar';
import AppCarousel from '../app-carousel';
import LoginPage from '../app-login-page';
import UserProfile from '../app-user-profile';
import News from '../app-news';

import { Container }  from 'react-bootstrap';
import { UserContext } from '../app-user-profile/app-user-profile-context';

import { Redirect, Route } from 'react-router-dom';
import { PostsContext } from '../app-posts/app-posts-create/app-post-create-context';

const App = () => 
{
    const [modalShow, setModalShow] =  useState(true);
    const [password, setpassword] = useState("");
    const [isSingIn, setisSingIn] = useState(false);  
    const [isSig, setisSig] = useState(false)

    const { user, setuser, login, singin, signOut } = useContext(UserContext);
    const {loadPost} = useContext(PostsContext)

    useEffect(() => {
        if (!modalShow) 
            setisSig(true);
    }, [modalShow])

    useEffect(() => {
        loadPost(user);
    }, [modalShow])

    function onEmail({ target : {value} })
    {
        setuser(Object.assign( user, {email: value }));
    }

    function onPassword({ target : {value} })
    {
        setpassword(value); 
    }

    function onCreateAccount(e) {
        e.preventDefault();

        if (!isSingIn) 
            login(password).then(() => setModalShow(false));
        else 
            singin(password).then(() => setModalShow(false));
    }

   
    function onNavSingInOut()
    {
        if (!modalShow && user.isLogin)
            setModalShow(true);
        else
            setModalShow(signOut());
    }    

    return (         
        <>
          
                <Container>

                    <AppNavbar onNavSingInOut={onNavSingInOut} isLogin={isSig} /> 

                    <Route path='/' exact component={AppCarousel} />
                    
                    {                
                        isSig ?
                        <> 
                                <Route path='/news' component={News} />
                                <Route path='/profile' exact component={UserProfile} />
                                
                        </>
                        : <Redirect to="/"/>
                    }


                    {/* { menuLoging } */}
                    {/* <Route path='/profile/:id' component={ } /> */}

                    
                    <LoginPage
                        onLogin={onEmail}
                        onPassword={onPassword}
                        onCreateAccount={onCreateAccount}
                        onSingIn={() => setisSingIn(!isSingIn)}
                        isSingIn={isSingIn}
                        show={modalShow} onHide={() => setModalShow(false)} />

                    {/* <Route path='/' path='/' component={ } /> */}
                    </Container>
              
        </>
         
    );
}

export default App;