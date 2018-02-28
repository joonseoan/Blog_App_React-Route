/*

1. Basic
npm init
npm install

2. React Router
npm install --save react-router-dom@4.0.0

3. React Router Process (FYI, react-router modules contains history)

User Web page -> User changes URL -> 
History part remembers the changed URL and send the info to "reacct-router" ->
"react-router" decides which components are necessary for the changed URL ->
Then, it sends the components info to React -> 
React renders the components

Here in the React Router Process, we should be able to understand
a single page application(SPA). 
In react, we normally use a single HTML and use JavaScript 
to dynamially change inside of the single HTML document. 

The changing contents inside of the single HTML are composed of the components.

- kinds of routes we will create
-----------------------------------
4. Home Route Convention

  Normally '/'
  for instance, : www.joon.com/

5. Wild Card

   /:id // to show very particular component on the screen.

6. Brand New
	
	/posts/new 

7. Redux side application

In route, we need to change state syntax slightly.

When we fetch post from api, there would be a unique property like "id".

Previously, we implement "state" like this.
---------------------------------------------------------------
key             type                 Sample (Example)
===============================================================
posts	        	array			    [
                                { title:'hello', contnet:'hi', id:4 }
                                { title:'bye', content: 'bye', id: 5 } 
                              ]


selectedPost	  object		  	{ title:'hello', contnet:'hi', id:4 }
(activePost)


--------------------------------------------------------------------

When we use 'route' we need do not need to 'selected or active post'
Instead, we should take an advantage of "id" inside of the object.
Then, for the particular post, we put this "id" into url (Route).

step1)

---------------------------------------------------------------
key             type                 Sample (Example)
===============================================================
posts		        array		      	[
                                    { title:'hello', contnet:'hi', id:4 }
                                    { title:'bye', content:'bye', id:5 }
                                ]

post id		    Route path "~~/:4"	  { title:'hello', contnet:'hi', id:4 }


step2)

Conventionally, we should use object instead of an array in posts
---------------------------------------------------------------
key             type                 Sample (Example)
===============================================================
posts		        array		        {
                                  4: {  title:'hello', contnet:'hi', id:4 }
                                  5: {  title:'bye', content: 'bye', id: 5  }
					                      }

post id		Route path "~~/:4"	    4: {title:'hello', contnet:'hi', id:4}


Just remind that it is for when we are able to change state using "id" or 
break down routes into a singe route tagged with "id"

[FYI***] When we change sub "state" inside of a single route, we can use the previous "selected or active" state rule.

Overview of api
We just need to understand the below.
---------------------------------------
visit --> http://reduxblog.herokuapp.com/

Four kinds of routes
1) Get => fetch 40 post api data from the blog
2) Post => create the brand new post
3) Get:id => fetch a single-id post api data (Wild Card)
4) Delete:id => delete a single id post 

[FYI] We will use 'fetch' 'Post' and 'Delete'


[FYI]
Using Chrome Browser "Postman",
------------------------------------
We can get info about the Get/Post of APIs of a certain application.
For instance we can use website of above. (need to have a key to have info)

1) When we do request 'Get'
2) When we do 'POST' a brand new blog '
3) When we do request Get to have a specific blog data 
4) When we do DELETE a post

We can find the api data info in JSON in this web.

*/
 
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


// import react-router
// [BrowserRouter] : to interacts with "History" lib                   
// [Route] : decides what components are required for the URL (Route)
//           given by "HISTORY". It is a role of a kind of routing configuration 

import { BrowserRouter, Route } from 'react-router-dom';

// When we are using "route", we do not need to use central component.
// <route path='/'> is replaced with 'app' component.
// App component is only when 'Route' is not required.

// import App from './components/app';

// import promise and wire it up to middleware to get data.
import promise from 'redux-promise';

import PostsIndex from './components/posts_index';

import rootReducers from './reducers';

// wireing promise up to middleware (promise)
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

/**
 * First of all, let's play around 'routes'
 * to correctly understand its main concept.
 * 
 * Two routes we just created and deleted here are a purpose of
 * understanding
 * 
 */

 /*

class Hello extends React.Component {


  render() {

    return (
      <div>
        Hello!
        </div>
    );

  }

}

class GoodBye extends React.Component {


  render() {

    return (
      <div>
        GoodBye
        </div>
    );

  }

}

*/


/*
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

    
    managing the changed URLs 
    and interacting with HISTORY of the router module
    <BrowserRouter>

    
    <div>

       Header: // { It will show up in all components }

      configuring the routing path
      and render the components (contents) 
      in the path defined.
      <Route path = "/hello" component = { Hello } />
      <Route path = "/goodbye" component = { GoodBye } />
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

  */

 ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducers)}>
    <BrowserRouter>
      <div>
        <Route path = "/" component = {PostsIndex} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));


