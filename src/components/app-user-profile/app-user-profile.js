import React, { useState, useEffect, useContext } from 'react';
import UserProfileInfo from '../app-user-profile-info';
import UserProfileEdit from '../app-user-profile-edit';
import { UserContext } from '../app-user-profile/app-user-profile-context';
import UserImageProvider from '../app-user-profile-edit/app-user-profile-image-context';
import PostsList from '../app-posts/app-posts-list';
import './style.css';


import { Container, Col, Row} from 'react-bootstrap';

export default function UserProfile()
{ 
    const [isEdit, setisEdit] = useState(false);

    return (
        <>
            <UserImageProvider>
                <Container className="mt-5">
                    {
                        isEdit ? <UserProfileEdit onEditProfile={() => setisEdit(!isEdit)}/>
                            :
                            <>
                                <UserProfileInfo onEditProfile={() => setisEdit(!isEdit)}/>
                                <Row>
                                    <Col md="3"></Col>

                                    <Col md="9"> 
                                        <PostsList />
                                    </Col>
                                </Row>
                            </>
                    }
                </Container>
            </UserImageProvider>
        </>
    )
}