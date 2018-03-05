// FETCH_POST is to get a single post which was posted.
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

import _ from 'lodash';

// Just remind that "state" here deployes 
//      the "action" value.  
// For the manipulation of "action" data,
//      we must use "state", not "action".

// Keep in mind that we can use "action" as it is
//      when we do not need to process "action".
// It is automatically deployed to "state" .

// state = {} : we will get default state, an empty object
export default function (state = {}, action) {

    switch (action.type) {

        // In order to delete the data out of the api
        case DELETE_POST:

        // "action.payload" here is "id" I set up 
        //      in the action creator.
        // "_.omit(state, action.payload)" :
        //       if the "state" has that "id",
        //       drop the the object here.
        return _.omit(state, action.payload);


        case FETCH_POST:
        
        // "post" : a sinble object of action.payload.data;
        const post = action.payload.data;
        console.log('post: ', post);

        // "newState : " { } is an initial value
        //      of { ...state }.
        // As we use "state" spread, we can put
        //      an object here.
        // const newState = { ...state };

        const newState = { ...state };
        console.log('newState1: ', newState);

        /**
         * Be careful!! It is a way to change an "object" to a "new object"
         *      with an "id" or "key" property.
         * 
         * "post: "
         * {id: 209889, title: "Sample 5", categories: "Category 5", content: "Content 5"}
         * 
         *                                 =======Change======>
         * "newState: "
         * {209889: {id: 209889, title: "Sample 5", categories: "Category 5", content: "Content 5"}}
         */
        // newState[] : making new objet with "post" value.
        
        /*
        newState[post.id] = post;
        console.log('newState2: ', newState);
        */

        // return newState;

        // [] does not make an array. 
        // It stands for making a key named "id".
        // "[action.payload.data.id]": make "id" property
        // "action.payload.data": 
        
        // Whenever we post new content,
        //      it override that content over and over here.
        return { ...state, 
            [action.payload.data.id] : action.payload.data };


        case FETCH_POSTS:

        // Expected to get [post1, post2]
        // but need to Transform it to { 4: post } format
        /**
         * Test tool : https://stephengrider.github.io/JSPlaygrounds/
         * 
         * ********* OMG!!!!! I got this one finally.
         *  Be careful!!!
         * 
         * It is a way to change an array to an oject!!!!
         * 
         *  const posts = [
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
