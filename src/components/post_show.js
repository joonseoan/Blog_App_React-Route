import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';



class PostShow extends Component {

    componentDidMount () {

        // "match" is a property of "route"
        //      which is imported 
        //      in the most parent component in "index.js"
        // "this" here is PostNew class and its parent's component
        //      in the fact that there is no constructor.

        // "params" is a "wild card" indicator or property from the last "/"
        // For instance, ":id~~~" out of "/post/:id"
        // In this case, it is "id".
        // this.props.match.params.id;
        
        const { id } = this.props.match.params;
        
        this.props.fetchPost(id);

    }

    render() {

        // the post we want to show.
        // 1)
        // posts[this.props.match.params.id ];

        return (

            <div>
                PostShow!!!
            </div>

        );

    }
}

// 1) 
// function mapStateToProps ( { posts }) {

    // 1)
    // return { posts };

// "ownProps" is named by convention.
// "ownProps" is equal to "this.props"
//      to go through all the way to class which an object.
// That is, it is exactly that "ownProps === this.props"
function mapStateToProps( { posts }, ownProps) {

    // Therefore, ownProps can be displaced with this.
    // It is very important techque to pull off the single property.
    return { post : posts[ownProps.match.params.id]}

}

export default connect(mapStateToProps, { fetchPost })(PostShow);