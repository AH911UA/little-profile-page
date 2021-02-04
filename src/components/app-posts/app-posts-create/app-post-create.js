import React, { useContext, useState } from 'react';
import { PostsContext } from './app-post-create-context';
import { UserContext } from '../../app-user-profile/app-user-profile-context';
import './style.css'

import { Modal, Button, InputGroup, FormControl} from 'react-bootstrap';


export default function PostsCreate(props)
{
    const [isFullPost, setisFullPost] = useState(false);
     
    const { user, setuser } = useContext(UserContext);
    const { sendPost, newPost, setNewPostState } = useContext(PostsContext);
     

    function onCreate() {
        if (!newPost.title || !newPost.description) {
            setisFullPost(false);
            return;
        }
           
        setisFullPost(true);
        console.log("USER : ", user);
        const _id = user.qPosts[user.qPosts.length - 1] + 1;
        let arr = user.qPosts;
        arr.push(_id);

        setuser({ ...user, qPosts: arr });
        let post = { ...newPost, id: _id };
        setNewPostState({...newPost, id : _id });

        console.log(newPost);
        console.log("USER : ", user);

        sendPost(user, post);
        
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default"> Title </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            id="inputTitle"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={({ target }) => {
                                setNewPostState({...newPost, title: target.value});
                                setisFullPost(newPost.description.trim() && newPost.title.trim());
                            }}
                            />
                    </InputGroup>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            description        
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" col={30} aria-label="With textarea" 
                        rows="7"
                        onChange={({ target }) =>
                        {
                            setNewPostState({...newPost, description: target.value })
                            setisFullPost(newPost.title.trim() && newPost.description.trim());
                        }
                        }
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>close</Button>
                <Button onClick={onCreate} disabled={ !isFullPost }>create</Button>
            </Modal.Footer>
        </Modal>
    )
}