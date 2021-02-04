import React, {useState, useEffect, useContext } from 'react';
import PostsCreate from '../app-posts/app-posts-create';
import { UserContext } from '../app-user-profile/app-user-profile-context';
import { Col, Row, Button, Image, Jumbotron } from 'react-bootstrap';

export default function UserProfileInfo(props)
{ 
    const { user } = useContext(UserContext);

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            { user ?  
                <Row>
                    <Col md="3" > 
                        <div className="containerAva">
                            <Row id="ava">
                                <Image className="personPhoto" src={!user.isAva ? './assets/user.png' : user.imageAva} />
                            </Row>
                        </div>  

                        <Row className="justify-content-md-center mt-3">
                            <Button variant="light" w="100" onClick={() => setModalShow(true)}>new post</Button>

                            <PostsCreate
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </Row>
                    </Col>
                    
                    <Col md="9">
                        <Jumbotron>
                            <h1> {user.name} </h1>
                            <p>  {user.aboutMe} </p>
                            <p>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={props.onEditProfile}
                                >Edit profile</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                : ''
            }
            
        </>
    )
}