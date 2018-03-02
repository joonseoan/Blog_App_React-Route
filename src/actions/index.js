/**
 * In order to get api data,
 * we need axios and promise
 * 
 * setup:
 * $ npm install --save axios redux-promise
 * 
 */

import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api/';

const API_KEY = '?joonseoan_182';

export function fetchPosts() {

    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    console.log('request: ', request);

    return {

        type: FETCH_POSTS,
        payload: request

    }
}

