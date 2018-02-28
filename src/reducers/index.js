import { combineReducers } from 'redux';

import posts from './posts';


console.log('posts in redux combiner: ', posts)
const rootReducer = combineReducers({
 
    posts

});

export default rootReducer;
