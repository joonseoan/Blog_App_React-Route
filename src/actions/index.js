/**
 * In order to get api data,
 * we need axios and promise
 * 
 * setup:
 * $ npm install --save axios redux-promise
 * 
 */

import axios from 'axios';

import KEY from './key.js';


export const FETCH_POSTS = 'FETCH_POSTS';

// in order to post "value" fromm "newPost"
export const CREATE_POST = 'CREATE_POST';

export const FETCH_POST = 'FETCH_POST';


const ROOT_URL = 'http://reduxblog.herokuapp.com/api/';

const API_KEY = KEY;

export function fetchPosts() {

    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    console.log('request: ', request);

    return {

        type: FETCH_POSTS,
        payload: request

    };

}

export function createPost(values, callback) {

    // "post" is used to post a brand new post.
    // "value" is used to fulfill the contents from "newPosts".
    // const request = axios.post(`${ ROOT_URL }/posts${ API_KEY }`, values);

    // Use callback and promise here to route 
    //      from "NewPost" to "PostsIndex" component. 
    const request = axios.post(`${ ROOT_URL }/posts${ API_KEY }`, values)
        
        // Like this, "promise" is able to control "callback"
        //      which is asynchronous.
        .then( () => {

            // After the value data is successfully posted 
            //      to the blog server, execute this callback function.
            // The callback function is in "NewPost" component 
            // "onSubmit(value, () => {
            //        this.props.history.push("/")
            //})" 
            callback();

        });

            // Then, finally returs action type and payload 
            //      which is a result.
            return {

                // Even without the "reducer" component related to this "return"
                //      it must exist.
                type: CREATE_POST,
                payload: request

            };
}

export function fetchPost(id) {

    const request = axios.get(`${ ROOT_URL }/posts/${id}${ API_KEY }`);

    return {

        type: FETCH_POST,
        payload: request

    }

}

