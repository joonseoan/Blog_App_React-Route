import { combineReducers } from 'redux';

/**
 * Redux Form

    1. Web Site (It is really important.)
    https://redux-form.com/7.2.3/

    2. Setup
    npm install --save redux-form@6.6.3

    Great reference: https://redux-form.com/7.0.4/examples/
 * 
 */

// Step 1: Identify different pieces of form states
// "redux-form" hooks up with "combineReduces" call.
// "redux-form" uses all "redux intances"
// So "redux instances" handles all states introduced by "redu-form"
// Then "redux-form" will wire up to "action creator"

// "reducer" is a property from 'redux-form'
// "as" a keyword:  "reduecer" assigned to "formReducer" 
//      which is an alias of redux-from
// So we are referring to "formReducer"

// It prevents confustion 
// when we impor another reduce in this component.
import { reducer as formReducer } from 'redux-form';


import posts from './posts';


console.log('posts in redux combiner: ', posts)
const rootReducer = combineReducers({
 
    posts,

    // form here must be "form"
    // It is a preset keyword in React
    form: formReducer
    

});

export default rootReducer;


