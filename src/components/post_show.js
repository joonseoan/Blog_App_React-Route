import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';


class PostShow extends Component {


    // It is for the "reloading" the post 
    //      exactly when there is not activity of "fetching"
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
        
        // We should notice 
        //      that it the second fetch.
        // We already did the first fetch of all data
        //      in "posts_index".
        // If we want to minimize the network ussage,
        //      we can use the "if"statement down below. 
        
        // However, during the development process,
        //      it is not recommended 
        //      because we should double check the data returned.
        /*
        if (!this.props.post) {

            this.props.fetchPost(id);

        }
        */

    }

    onDeleteClick() {

        // Call an action creator "deletePost()" 
        const { id } = this.props.match.params;
        
        // We have to delete the post "route"
        //      which is "a wild card"
        // So we must use "const { id } = this.props.match.params;"
       
        // A callback function to route to the root directory
        //      as soon as we delete the post.
        this.props.deletePost(id, () => {

            this.props.history.push("/");

        });

        // It deletes only the "id" property of "post"
        // this.props.deletePost(this.props.post.id);
    
    }
    
    render() {

        // the post we want to show.
        // 1)
        // posts[this.props.match.params.id ];

        // Destructuring "this.props.post"
        const { post } = this.props;
        console.log('post in post/show:', post)

        // Be careful again asynchronous issue.
        // Until the code flow meets 
        //      "export default connect(mapStateToProps, { fetchPost })(PostShow);"
        //      at the bottom of this file,
        //      it does not have value, but "undeffined."

        if (!post)
        return (
            <div>
                Loading...wait.
            </div>
        );

        return (

            <div>
                <Link to = "/">Back to Index</Link>
                
                <button 
                    className = "btn btn-danger pull-xs-right"
                    onClick = { this.onDeleteClick.bind(this) }
                >
                Delete Post
                </button>
                 
                <h3>{ post.title }</h3>
                <h6>Categories: { post.categories }</h6>
                <p>{ post.content }</p>
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

    // console.log ('{posts} : ', { posts })
    return { post : posts[ownProps.match.params.id] }

}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);