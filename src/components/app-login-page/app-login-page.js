import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const LoginPage = (props) => 
{
    return (
         <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                

                <Form onSubmit={props.onCreateAccount}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" size="sm" placeholder="Enter email" 
                            onChange={props.onLogin}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" size="sm" placeholder="Password" 
                            onChange={props.onPassword}
                        />
                        <Form.Text className="text-muted">
                           Password should be at least 6 characters
                        </Form.Text>
                    </Form.Group>
                 
                    <Modal.Footer>
                        <Button variant={props.isSingIn ? "primary" : "light"} onClick={props.onSingIn}> sing in </Button>
                        <Button variant="light" type="submit"> submit </Button>
                    </Modal.Footer>
                </Form>

            </Modal.Body>
        </Modal>
    );
}

export default LoginPage;