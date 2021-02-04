import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
 


export const PostsContext = React.createContext(null);

export default function PostsContextProvider({ children })
{
    const [posts, setPosts] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const [newPost, setNewPostState] = useState({
                                                    id: '',
                                                    title: '',
                                                    description: '',
                                                    qLike: 0,
                                                    setILike: false
    });
     
    function setIsNewPost(isPost = false) {
        setIsNew(isPost);
    }

    function sendPost(user, post) {
        firebase.database().ref(`users/${user.id}`).set(user).then(() => {
            firebase.database().ref(`my-posts/'${user.id}/${user.qPosts[user.qPosts.length - 1]}`)
                .set(post)
                .then(() => {
                    alert("post created");
                    setPosts([...posts, post]);
                    setIsNew(true);
            }).catch((e) => {
                alert(e);
            });
        }).catch(e => {
            alert(e);
            user.qPosts.pop();
        });
    }

    function loadPost(user) {

        let arr = [];
        user.qPosts.forEach(el => {
            if (el !== 0) {
                let postsRef = firebase.database().ref(`my-posts/'${user.id}/${el}`);
                postsRef.on('value', (snapshot) => {
                    arr.push(snapshot.val());        
                });
            }
        })

        setPosts(arr);
    }


    function setLike(postId, userId) {
        
        let post = posts.find(el => el.id == postId);

        post.setILike = !post.setILike;
        post.setILike ? post.qLike++ : post.qLike--;

      
        firebase.database().ref(`my-posts/'${userId}/${postId}`)
            .set(post)
            .then(() => {
                let arr = [];
                posts.forEach(el => {
                    if (!arr.find(e => e.id == el.id))
                        arr.push(el)
                });
                setPosts(arr);
            }) 
            .catch((e) => {
                post.qLike--;
                setPosts(posts.map(el => el.id == postId ? post : el))
            });
    }



    return (
        <PostsContext.Provider value={{
            posts, setPosts,
            isNew, setIsNewPost, 
            setLike, 
            sendPost, loadPost, 

            newPost, setNewPostState, 
        }}>
            { children }
        </PostsContext.Provider>
    );
}


// export default newPost;