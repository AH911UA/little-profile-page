import React, { useEffect, useContext, useState } from 'react';
import PostsListItem from '../app-posts-list-item';
import { Container, Row } from 'react-bootstrap';
import { PostsContext } from '../app-posts-create/app-post-create-context';
import { UserContext } from '../../app-user-profile/app-user-profile-context';


export default function PostsList() {
    const { posts } = useContext(PostsContext);
    const { user } = useContext(UserContext);
    const [postsShow, setpostsShow] = useState([]);

    useEffect(() => {
        updateList();
    }, [posts]);

    function updateList()
    {
        let newPostList = [];

        posts.forEach((p, i) => p && p.id ?
            newPostList.push(
                <PostsListItem key={p.id} i={i + 1} title={p.title} description={p.description} qLike={p.qLike} postId={p.id} userId={user.id} />) : '');
        setpostsShow(newPostList.reverse());

        newPostList = [];
    }

    return (
        <Container className="mt-3">
            <Row className="mb-3">
                <h2> My posts </h2>
            </Row>

            { postsShow } 
             
        </Container>
    )
}