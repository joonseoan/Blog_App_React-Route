import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

// create action creator!!
import { fetchPosts } from '../actions';


class PostsIndex extends Component {

    // So far in the previous projet, 
    // we fetched data when we make some event like input or type 
    
    // In this case that we just find the blog data and pages
    // we do not have any event.
    // At this momenmt, we can use "Ract lifecycle method"
    // In order to call action creator immediately after the rerder starts
    
    componentDidMount () {

        // will kick off dataload processs
        this.props.fetchPosts();
    }

    /**
     * Test : chrome -> network -> xhr
     */

    // React always has asynch components.
    // So we do not knwo when we can get the api data (it takes a time by the way)
    // It is not that big of deal here
    // In order to call action creator before the reder stat to work
    /*
        componentWillMount() {

        }
    */

   renderPosts() {

    /****************
       "_.map" : it has an abilty to transform an object to an array
       "What the hell, reall need to know"
    */
    console.log('_.map(this.props.posts): ', _.map(this.props.posts))
    
    return _.map(this.props.posts, post => {

        return (

            // We can access the property or element in this array
            // ***** because "map()" is implemented here.
            <li className ='list-group-item' key = { post.id }>
                { post.title }
            </li>
        );

        /**
         * ***Please, remember that we cannot access a element or propeert
         *    in a way above with a normal array.
         * 
         * 
         *  const ddd = [ {name : 'joon'}, {school:'fucking sheridan'}];
            console.log('name : ', ddd.name); => undefined
            console.log('school: ', name.school); => undefined

            ddd.map(data => { console.log(data.name)}); // => joon
         * 
         */
    

    }); 

 
        
    


}

    render() {

        // console.log will show up twice.
        // It is because componentDidMount will try to make an action 
        // then render without any data first above.
        // Then, when it comes to connect with action creator,
        // it will have an api data from 'actions' foleder.
        console.log('this.props.posts in render: ', this.props.posts);

        console.log('this.renderPosts(): ', this.renderPosts())        


        return (

            <div>
                <h3>Posts</h3>
                <ul className="list-group">

                    {/*It is called helper function (FYI)* ^^;;;*/} 
                    { this.renderPosts() }

                </ul>
                
            
            </div>

        );
    }
}

// Why we need mapStateToProps, not a mapDispatchToProps
function mapStateToProps ({ posts }) {

    console.log('{posts}: ', { posts})

    // do not forget { }!!!!
    return { posts };

}

// {fetchPosts} : we do not need to write mapDispatchToProps
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);