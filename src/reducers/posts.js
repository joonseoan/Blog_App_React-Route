import { FETCH_POSTS } from '../actions';

import _ from 'lodash';

// state = {} : we will get default state, an empty object
export default function (state = {}, action) {

    switch (action.type) {

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
