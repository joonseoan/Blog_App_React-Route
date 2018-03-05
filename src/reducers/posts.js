// FETCH_POST is to get a single post which was posted.
import { FETCH_POSTS, FETCH_POST } from '../actions';

import _ from 'lodash';

// state = {} : we will get default state, an empty object
export default function (state = {}, action) {

    switch (action.type) {

        case FETCH_POST:

        // 하나 하나 분석 해 볼 것.
        
        const post = action.payload.data;
        console.log('post: ', post);

        const newState = { ...state };
        console.log('newState: ', newState);
        newState[post.id] = post;
        return newState;
        


        // [] does not make an array. 
        // It stands for making a key with "id".
        //return { ...state, 
        //    [action.payload.data.id] : action.payload.data };

        case FETCH_POSTS:

        // Expected to get [post1, post2]
        // but need to Transform it to { 4: post } format
        /**
         * Test tool : https://stephengrider.github.io/JSPlaygrounds/
         * 
         * ********* OMG!!!!! I got this one finally.
         * const posts = [
                { id: 4, title: 'hi' },
                { id: 25, title: 'bye'},
                { id: 23,  title: 'Hows it going'}
            ];

            //*********************** "_.mapKeys!!!!!!!
            // posts => array
            // 'id' => unique key
            //1)

            _.mapKeys(posts, 'id')

            => result: transforming the previous format to !!
            
            { 
              "4":{"id":4,"title":"hi"},
              "23":{"id":23,"title":"Hows it going"},
              "25":{"id":25,"title":"bye"}
            }

            //2)
            const state = _.mapKeys(posts, 'id')
            state['4']

            => { "id":4,"title":"hi" }
         *  
         */

        console.log('action.payload: ', action.payload);

        // returns an array object
        console.log('action.payload.data: ', action.payload.data); 
        
        // transforming the array to plain object type with key "id"
        console.log ('mapKeys', _.mapKeys(action.payload.data, 'id'));

        return _.mapKeys(action.payload.data, 'id');
        
        default:
        return state;

    }

}
