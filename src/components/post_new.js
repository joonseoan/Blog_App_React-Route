import React, { Component } from 'react';

// step 2. make a Field component per piece of state. 
// "reduxForm" a function to call 'redux-form'
// "reduxForm" is a kind of "connect" helper function for the component
//  to communicate with the additional "reducer" or " form: formReducer" 
//  we just wired in.
// 
import {Field, reduxForm} from 'redux-form';

class PostNew extends Component {

    render() {

        return(

            // It is the first form wiring up to the first 'Field'
            <div>
                <form>
                    <Field

                    /*  'name = title' here what kind of states
                        we describes here and what piece of states
                        the user is editing.

                        The first "Field" is "title" in the component of app.

                    */
                        name = "title"

                        // "component" proerty takes in a function or component
                        // to display the component.
                        component = {}
                    />

                </form>
            </div>
        );
    }

}

// It handles multiple pieces of forms as a single statement
export default reduxForm({

    //configuration options here
    form: 'PostsNewForm'

})(PostNew);

/* [FYI]
export default reduxForm({

    // The same keyword and property value as above means that
    // the components that will be stated here, will be merged in reduxtForm above.
    form: 'PostsNewForm'

})(PostNew);
*/
