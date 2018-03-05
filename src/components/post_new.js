import React, { Component } from 'react';

// step 2. make a "Field" and "reduxForm" ~=function per piece of state. 
//
//  "Field" and "reduxForm" do a role of kinds of the helper function.

//   - "Field" is a function to specify and collect "form tags" of HTML like "input"
//      It is used to specify different HTML form elements in Field.
// 
//   - 1) "reduxForm" is a kind of "connect" helper function for the component
//      to communicate with the additional "reducer" and "action creator", specifically
//      through " form: formReducer" defined in reducers, "reducers/index.js" and a call
//      of action creator here.        
//
//      BTW, the "reduxForm" function is specified at the bottom of the code.


import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createPost } from '../actions';


class PostNew extends Component {

    // By convention, the argument name is "field".
    // "field" as an object type
    //   includes all properties (arbitrarly) defined in <Field> tag. 
    
    /** [Find the below]
     
        {input: {…}, meta: {…}, showTitle: "Title"}
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
      
     */


    //1)
    // renderTitleField(field) {

    //2) to dry out the code by combining diffrent "Fields"
    renderField(field) {

        // because "input" is an object. 
        // Spread depends on the property, not object
        console.log('field: ', field); 

        console.log('...field.input: ', ...field.input); 


        // "field" can be confused 
        //      because it is supposed to wire up the JSX 
        //      to the "Field" component of "render()""

        // In order to keep returning
        //      the "JSX's changing state"
        //      to the Field component specified below ,
        //      we use "field" argument which contains "event handler"
        //      like {name: "title", onBlur: ƒ, onChange: ƒ, 
        //                               onDragStart: ƒ, onDrop: ƒ, …} above

        // The calling this function from { this.renderTitleField }
        //  just just kick in once. Therefor, it does not reflect
        //  the dynamically changing state.

        // it is a way to desturcture "field"'s first and second...children
        const { meta : { touched, error } } = field;

        // 1)
        // const className = `form-group ${field.meta.touched && field.meta.error
        // ? has-danger : ''}`;

        // as "{ meta }" is declared above, we can remove "field" of "field.meta error"
        // { touched : touched }
        // when "touched" and "error" exist together, 
        //      show the error message with red color.
        // 2)
        const className = `form-group ${ touched && error ? 'has-danger' : '' }`

        return (

            // 1)
            // <div className = "form-group has-danger">

            //2)
            // as "className" variable is declared above
            <div className = { className } >
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
                        and "props" which is tag's attribute value.

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

                
                {/**
                * 3 differnt states of "form"
                * 
                * 1. pristine : Every render gives default. Not touched, not input, not selected
                *               Mainly, it is when this pops up on the screen. 
                * 
                * 2. touched : the user has selected or focused in input 
                *              and then focused out in the input when the user completes the input
                * 
                * 3. invalid : after validation, the result.
                * 
                */}

                {/*If an error occurs, 
                    "field.meta* receives the error message 
                    and add the message in 'error' property of "field.meta"
                    we created in the validate(value) function */}

                {/* Don't be confused with "error = {}" 
                    It means that error message shows up only 
                    when the user completes touched :
                    (range: click () or select - work on it - focus away from it)
                    
                    BTW, "touched" is property of "field.meta"
                */}
                <div className = "text-help">

                    { touched ? error : "" }
                
                </div>
            </div>

        );

    }

    /* 1) Find 2) above. the way to dry out.
    (avoid repeatition of the code)

    renderTagsField() {


    }
    */

    // values are automatically from <input> 
    onSubmit(values) {

        console.log('values in onSubmit(): ', values);
        
        // It automatically route to "root" directory.
        // However, it is after the index.js renders "html" documemnt.
        // Therfore, the result on "/" root directory does not show
        //      the value just sent to the API of the blog.
        // this.props.history.push('/');

        // After the value data is sent to the action creator,
        //      then action creator posts the data to the blog server,
        //      it can "route" back to the root directory.
        this.props.createPost(values, () => {

            const { history : { push } } = this.props; 
            push('/');

        });

    }

    render() {

        // { handleSubmit } is built-in property of redux-form.
        // As redux-form is wired up to this component, "PostNew"
        //      a ton of properties of redux-form will walk throuth the component/
        // Here, we just pulled off the one, "handleSubmit" property 
        //      to control "submit"
        const { handleSubmit } = this.props;

        return(

            // It is the first form wiring up to the first 'Field'
            <div>
                {/*
                    <form onSubmit = {}>
                    redux-from handes the states of "form".
                    For intance, the "values" in "form" and validation of "values.""

                    *
                    However, it does not take care of posting some data
                    back in a server, what so eveer.

                    The users or programers only are interested in doing 
                    something with "values" of "form". 

                    So we need to get "values" involved in redux!!!!
                    Then, we need to pass those data through costomized logic
                    to have the data making the application out.
                    *
                     
                     
                    "handleSubmit" property deals with taking a data
                        and saving data which redux-form itself does not
                        manage. redux-form mainly deals with "value state" 
                        and "validation"!!!!
                    
                    In order to take form data, "handleSubmit" is necessary
                        ,binding the "onSubmit()" helper function specified above.
                
                    Just bear in mind that this "handleSubmit" will execute
                        after confirmation that there is no error in validation.
                    
                    *
                    * FYI, we can bind the helper function when we call it.!!!
                    * 
                */}
                <form onSubmit = { handleSubmit(this.onSubmit.bind(this)) }>
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

                        name = "content"
                        component = { this.renderField }
                        showTitle = "Cotents space"
                    
                    />

                    {/*For the submit button, we do not use "Field".*/}
                    <button type = "submit" className = "btn btn-primary">
                    Submit</button>

                    <Link to = "/" className = "btn btn-danger">Cancel</Link>

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

    if (!value.content) {

        // create and add "title" key and value of "Please, enter title"
        err.content = 'Please, enter contents.';
    
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
// 1) 
// only when we use "reduxFomr" 
/*
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
*/


//2)
// only when we use "reduxForm" & redux "connect" together
export default reduxForm({

    // connection to "reducers"
    form: 'PostsNewForm',
    validate

})(
    // connection to "action creators"
    // The "connect" component should be inside of "reduxForm"
    connect(null, { createPost })(PostNew)

);


/* 
[FYI]
export default reduxForm({

    // The same keyword and property value as above means that
    // the components that will be stated here, will be merged in reduxtForm above.
    form: 'PostsNewForm'

})(PostNew);
*/

/**
 * 3 differnt states of "form"
 * 
 * 1. pristine : Every render gives default. Not touched, not input, not selected
 *               Mainly, it is when this pops up on the screen. 
 * 
 * 2. touched : the user has selected or focused in input 
 *              and then focused out in the input when the user completes the input
 * 
 * 3. invalid : after validation, the result.
 * 
 */