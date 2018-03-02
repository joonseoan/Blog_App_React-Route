import React, { Component } from 'react';

// step 2. make a "Field" and "reduxForm" ~=function per piece of state. 
//
//  "Field" and "reduxForm" do a role of kinds of the helper function.

//   - "Field"  is a function to specify and collect "form tags" like input
//      It is used to specify different HTML form elements in Field.
// 
//   - 1) "reduxForm" is a kind of "connect" helper function for the component
//      to communicate with the additional "reducer", specifically
//      " form: formReducer" defined in reducers, "reducers/index.js".
//
//      The "reduxForm" function is specified at the bottom of the code.


import {Field, reduxForm} from 'redux-form';

class PostNew extends Component {

    // By convention, the argument name is "field".
    // "field" as an object type
    //   includes all properties arbitrary defined in <Field> tag 
    /**
     *  {input: {…}, meta: {…}, showTitle: "Title"}
        input
        :
        {name: "title", onBlur: ƒ, onChange: ƒ, onDragStart: ƒ, onDrop: ƒ, …}
        meta
        :
        {active: false, asyncValidating: false, autofilled: false, dirty: false, dispatch: ƒ, …}
        showTitle
        :
        "Title"
        __proto__
        :
        Object 
     * 
     * 
     */


    //1)
    // renderTitleField(field) {

    //2) to dry out the code by combining diffrent "Fields"
    renderField(field) {

        console.log('field: ', field.input); // nothing happens.

        console.log('...field.input: ', ...field.input); 

        // can be confused 
        //  because it is supposed to wire up the JSX 
        //  to the "Field" component of "render()""

        // In order to keep returning
        //  the "JSX's changing state"
        //  to the Field component specified below ,
        //  we use "field"argument which contains "event handler"

        // The calling this function from { this.renderTitleField }
        //  just just kick in once. Therefor, it does not reflect
        //  the changing state.

        return (

            <div className = "form-group">

                <label>

                    {/* The reason that "field.showTitle is used 
                        instead of "...field.showTitle" is 
                        because "showTitle is a simple property that we simply created
                        and which does not have object list or an array" */}
                    { field.showTitle }
            
                </label>

                <input 
                    /*
                        "...field.input" contains a bunch event handler
                        and props.

                        "...field.input" indicates that it is an object
                        that includes all properties of "input" tag.

                        Specifically,
                        <input
                            onChange = { field.input.onChange }
                            onFocus = { field.input.onFocus }
                            onBlur = {field.input.onBlur}
                        />

                    */
                    type = "text"
                    className = "form-control"
                    
                    // ... is not for "field" ojbect but for "input" property 
                    //  which has another objects!!!!
                    { ...field.input }
    
                />
                {/*If an error occurs, 
                    "field.meta* receives the error message 
                    and add the message in 'error' property of "field.meta"
                    we created in the validate(value) function */}
                { field.meta.error }

            </div>

        );

    }

    /* 1) Find 2) above. the way to dry out.
    (avoid repeatition of the code)

    renderTagsField() {


    }
    */

    render() {

        return(

            // It is the first form wiring up to the first 'Field'
            <div>
                <form>
                    <Field

                    /*  'name = title' tells us here what kind of states
                            we should describe here and more significantly
                            what piece of states "Field" is going to produce.

                        The first "Field" is "title" in the component of app.

                        Field: knows how to communicate with "reduxForm".
                                which means that it has ability to deal with
                                event handlers and action creators.
                        
                                However, "Field" does not know how to create JSX
                                         and how to show the elements to the users.

                                Therefore, "Field" sends a component to contains
                                JSX which has tools to show the user interface , visual
                                face.


                    */
                        name = "title"

                        // "component" proerty takes in a function
                        //      to display the component.
                        // We do not have to use "()"" to call function 
                        //      even though the fuction has "return".
                        
                        // "return" is considered as a part to show "JSX"
                        //      not to return value!!!!!
                        // 1)
                        // component = { this.renderTitleField }

                        // to dry out the code above
                        // 2)
                        component = { this.renderField }
                        
                        // to diferent title name

                        showTitle = "Title"
                    />

                    <Field 

                        name = 'categories'
                        // 1)
                        // component = { this.renderTagsField }

                        //2)
                        component = { this.renderField }

                        showTitle = "Categories"
                    />

                    <Field

                        name = "contents"
                        component = { this.renderField }

                        showTitle = "Cotents space"
                    
                    />
                </form>
            </div>
        );
    }

}


// If an error occurres, it addes the error-generating property to "err" object
// Then, goes to rener() with the error-generating property 
//  to find a right and same name value in <Field>.
// Then, once it find the name value, it goes to "renderField" helper method
//  to deliver error message to "field.meta.error" above.
function validate(value) {

    // Presumablly, the user enter 'ddd' to all <input>s
    // FYI, "name"s in Field are keys in the "value" object.
    // The result =>  for instance {} title : ddd, categories : ddd, contents: ddd }
    console.log('value: ', value);

    // If error occurs, "error" object contains the error
    const err = {};

    // Validate the inputs form 'value'
    // It is an error that the user did not type "title" <input>
    // Therefore, it won't submit the form.
    if (!value.title) {

        // create and add "title" key and value of "Please, enter title"
        err.title = 'Please, enter title.';
    
    }

    if (!value.categories) {

        err.categories = 'Please, enter categories.';
    
    }

    if (!value.contents) {

        // create and add "title" key and value of "Please, enter title"
        err.contents = 'Please, enter contents.';
    
    }

    /*
    // the way to get character length of a string
    if (value.title.length < 3) {

        error.title = "please enter at least 3 characters"
    }
    */

    // If error is empty, the form is fine to submit
    // If error has any properties, redux form assums 
    //  that form is invalid.
    return err;

}

// It handles multiple pieces of forms in same statements
// "reduxForm" here to direclty communicate with "reducers" 
export default reduxForm({

    //  configuration options here
    //      the value of the "form" must be unique
    //      that means that we do not share "form" value with any other forms.
    form: 'PostsNewForm',
    
    // validation is going to wire up to "reduxForm"
    validate


// As we specify "PostNew" component, 
//  "reduxForm" wires the component to "reducers"
})(PostNew);

/* 
[FYI]
export default reduxForm({

    // The same keyword and property value as above means that
    // the components that will be stated here, will be merged in reduxtForm above.
    form: 'PostsNewForm'

})(PostNew);
*/
