import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

// Instead of anchor <a src="">, React uses "Link" module.
import { Link } from 'react-router-dom';

// create action creator!!
import { fetchPosts } from '../actions';


class PostsIndex extends Component {

    // So far, in the previous project, 
    //      we fetched data when we made some event in the form element.
    
    // In this case that we just found the blog api data 
    //      we do not have any event.
    // At this momenmt, we can use "Ract lifecycle method"
    // In order to call action creator immediately 
    //      after the component completely finishes
    // ****** The reason that the past of "didMount" is because react is asynch 
    //      so that we do not know when action creator returns blog data.
    //      Therefore, we should get plug in the data after the component work ends.
    // React always has asynch components.
    // So we do not know when this component can get the api data (it takes a time by the way)
    
    componentDidMount () {

        // will kick off dataload processs
        this.props.fetchPosts();
    }

    /**
     * Test : chrome -> network -> xhr
     */

    // In order to call action creator before the reder stat to work
    /*
        componentWillMount() {

        }
    */

   renderPosts() {

    /****************
        "_.map" : it has an abilty to get the plain object back to an array
       "What the hell, really need to know of it"

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

        /*
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
        // It is because componentDidMount will try to make an action creator work 
        //      without connection with "stateDispatchToProps".
        // Then, when it comes to connect with action creator,
        //      it will have an api data from 'actions' foleder.
        console.log('this.props.posts in render: ', this.props.posts);

        console.log('this.renderPosts(): ', this.renderPosts())        


        return (

            <div>
                <div className= "text-xs-right">
                {/* to = "must be same as Route path" 

                    *****
                    The difference between anchor tag and "Link"
                    is that "Link" does not request http and htlm document again.
                    It just works between the components.   

                */}
                    <Link className = "btn btn-primary" to="posts/new">
                        Add a Post
                    </Link>    
                </div>
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