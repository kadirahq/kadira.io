---
navTitle: 
navSubTitle: Introduction to FlowRouter
title: Introduction to FlowRouter
enableComments: true
---

[FlowRouter](https://github.com/meteorhacks/flow-router) is a very simple router for Meteor. It is focused only on routing for client-side apps and does not handle rendering itself.

It exposes a great API for changing the URL and reactively getting data from the URL. However, inside the router, it's not reactive. Most importantly, FlowRouter is designed with performance in mind and it focuses on what it does best: **routing**.

You can install flow router with:

~~~bash
meteor add kadira:flow-router
~~~

Creating a route is simple:

~~~js
FlowRouter.route('/blog/:postId', {
    name: 'blogPost',
    action: function(params) {
        console.log("This is my blog post:", params.postId);
    }
}); 
~~~

In FlowRouter, you can even create a route without any options like this:

~~~js
FlowRouter.route('/blog/:postId');
~~~

Then you can use FlowRouter's API to watch and manipulate the route. However, that's not how we use it most of the time.

## Defining Routes

FlowRouter supports [Express](http://expressjs.com/)-like routing syntax. Internally it uses the [`path-to-regexp`](https://github.com/component/path-to-regexp) npm module for route definitions.

A simple route definition looks like this:

~~~js
FlowRouter.route('/blog/:category/:postId', {
    name: "blog",
    action: function(params, queryParams) {

    }
});
~~~

Let's imagine the actual path is `/blog/kadira/getting-started?comments=show`. Then, the above `params` and `queryParams` objects will look like this:

~~~js
params = {category: "kadira", postId: "getting-started"};
queryParams = {comments: "show"}
~~~


> You can define optional fields in the route syntax and even use regular expressions. Refer to the path-to-regexp [documentation](https://github.com/component/path-to-regexp#suffixed-parameters) to learn more about the path-definition syntax.

## Group Routes

FlowRouter comes with a handy way to define group routes. It gives a structure to your routes and allows you to do common tasks with triggers.

Let's define an admin section for our app:

~~~js
var adminSection = FlowRouter.group({
    prefix: "/admin"
});
~~~

Then, we can create routes in the admin section like this:

~~~js
// for the /admin page
adminSection.route('/', {
    action: function() {}
});

// for the /admin/new-post page
adminSection.route('/new-post', {
    action: function() {}
});
~~~

You can even define nested group routes like this:

~~~js
var superAdminSection = adminSection.group({
    prefix: "/super"
});

superAdminSection.route('/access-control', {
    action: function() {}
})
~~~