import React, { useContext, useState } from 'react';
import { UserContext } from '../app-user-profile/app-user-profile-context';
import { UserImageContext } from './app-user-profile-image-context';
import './style.css' 

import { Container, Col, Row, Button, Form, InputGroup, FormControl } from 'react-bootstrap';

export default function UserProfileEdit(props)
{ 
    const { user, sendEdit } = useContext(UserContext);
    const { image, setImage } = useContext(UserImageContext);

    const [userAbout, setuserAbout] = useState(user.aboutMe);
    const [userName, setuserName] = useState(user.name);
    const [userAva, setuserAva] = useState(user.userAva);

    function onAbout(e)
    {
        setuserAbout(e.target.value);
        console.log(userAva);
    }

    function onName(e)
    {
        setuserName(e.target.value);
    }

    function saveEdit(e) {
        
        e.preventDefault();
        // if (userAva != "" && !user.isAva)
        //     user.isAva = true;

        // userImage.saveImage(); сохранить аватарку

        if (user.aboutMe !== userAbout.trim() || user.name !== userName.trim() || user.imageAva != userAva) {
            sendEdit(userName, userAbout, userAva || user.imageAva);
        }

        props.onEditProfile();
    }

    function loadAva(e)
    {
        console.log("IMAGE : ", image);

        for (let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i];

            if (!file.type.startsWith('image/')) { continue }
            
            console.log("setImage", setImage);
            console.log("setImage", typeof setImage);

            setImage(Object.assign(image || {}, { name: file.name }));

            let img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;

            document.getElementById("test").innerHTML = '';
            document.getElementById("test").appendChild(img);

            let reader = new FileReader();
            reader.onload = (
                aImg =>
                    e => {
                        setuserAva(e.target.result);
                        console.log("e.target.result : ", e.target.result);
                        // userImage = e.target.result;
                        return aImg.src = e.target.result
                    }
                )(img);
            reader.readAsDataURL(file);
        }
        
        // setuserAva(file.name)
        
       
    }

    return (
        <Container className="editPage"  >
            <section>
                <Button variant="outline-warning"
                    onClick={props.onEditProfile}> <i class="fa fa-arrow-left" aria-hidden="true"></i> back </Button> 
            </section>
               
                  
                <Form className="mt-5" onSubmit={ saveEdit }>
                
                <Row> 
                    <Col sm="4" md="5">
                        <Form.File id="formcheck-api-custom" className="mb-3  " custom
                            onChange={loadAva} 
                        >
                            <Form.File.Input isValid
                                onChange={loadAva}
                                accept="image/*" 
                                />
                            <Form.File.Label>
                                <i class="fa fa-user-circle"></i> 
                            </Form.File.Label>
                        </Form.File>
                    </Col> 
    

                    <Col sm="8" md="7"> 
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"> name </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={onName}
                                value={userName}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text> about you </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea"
                        aria-label="With textarea"
                        onChange={onAbout}
                        value={userAbout}
                    />
                </InputGroup>
                
                {
                    user.aboutMe !== userAbout || user.name !== userName || user.userAva !== userAva ?
                        <Button className="mt-3  mb-3"
                            variant="outline-success"
                            type="submit"
                        > apply </Button> 
                        : ""
                }
                
            </Form> 

            <Row id="test"></Row>
        </Container>  
    );
}