import React, { useState, useContext } from 'react';
import { Row, Card, Col, Badge } from 'react-bootstrap';
import { PostsContext } from '../app-posts-create/app-post-create-context';
import './style.css';

export default function PostsListItem(props)
{
    const { setLike, posts } = useContext(PostsContext)
    const userId = props.userId;
    const postId = props.postId;
    const i = props.i;

    return (
        <Row className="mb-3">
            <div className="align-self-center">
                <Col  xs={1}  >
                    <Badge variant="light" className="p-3 "> { i }</Badge>
                </Col>
            </div>
            <Col>
                <Card style={{ width: '100%' }}>
                <Card.Body className="post">
                        <Card.Title> { props.title } </Card.Title>
                    <Card.Text>
                            { props.description }
                    </Card.Text>
                        <div className="postTrigger">
                            <Card.Link  >
                                <i class={ posts[i - 1].setILike ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up"}
                                    onClick={ () => setLike(postId, userId) }
                                    aria-hidden="false">{ props.qLike }</i>
                            </Card.Link>
                        </div>
                </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}




