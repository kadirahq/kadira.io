---
navTitle: 
navSubTitle: Manipulating the URL and Link Generation
title: Manipulating the URL and Link Generation
enableComments: true
---

We think of the URL as a global state machine in our app. It keeps the essential state of our app. That means, for most of the actions in our app, there is a **unique** URL. This is true for most apps, but it's not a rule you need to follow always.

Since the URL is a key part of our app, FlowRouter has a few APIs to manipulate the URL. We are going to discuss them in this section.

Let's imagine we've a route like this:

~~~js
FlowRouter.route('/blog/:category/:postId', {
    name: 'blogPost',
    action: () {
        ...
    }
});
~~~

Let's change the URL for this route in a few different ways.

## Using FlowRouter.path and Anchor Tags

Using anchor (`<a>`) tags is the natural way we change a URL in the web. And it should be the natural way for Meteor apps as well. You can use `FlowRouter.path` to generate new URLs as you need.

> We use Blaze in the following examples, but you can easily map those for React as well. These features are independent of the rendering framework.

Here's how we can use `FlowRouter.path`.

First, we need to create a template helper that gives us the URL:

~~~js
Template.blogHome.helpers({
  pathForPost: function() {
    var post = this;
    var params = {
        category: post.category,
        postId: post._id
    };
    var queryParams = {comments: "yes"};
    var routeName = "blogPost";
    var path = FlowRouter.path(routeName, params, queryParams);

    return path;
  }
});
~~~

In the above template helper, we generated the path using `FlowRouter.path()`. The first argument is the name of the route. Then FlowRouter will get the path definition from the route. The other two arguments are the params for the path definition and a map of the query  params.

Instead of the route name, you can use a path definition directly:

~~~js
var path = FlowRouter.path("/blog/:category/:postId", params, queryParams);
~~~

Then inside the template, you can use the `pathForPost` helper like this:

~~~html
<template name="blogHome">
  <p>This is the home page of our blog</p>
  <ul>
  {{#each posts}}
    <li>
      <a href={{pathForPost}}>{{title}}</a>
    </li>
  {{/each}}
  </ul>
</template>
~~~

> [You can access the complete code via GitHub](https://github.com/flow-examples/flow-router-guide-example/tree/link-generation)

For Blaze, there is a [helper package](https://atmospherejs.com/arillo/flow-router-helpers), which exposes a few template helpers to generate paths right inside the template.

## Using FlowRouter.go()

Sometimes, you can't use anchor tags to navigate to pages. In those cases, you can use `FlowRouter.go()`. It's very similar to `FlowRouter.path()` but it changes the URL as well.

## Changing Route Params and Query Params Directly

Sometimes, we only need to change a params in the current route's path definition. Or we need to add or remove a few query parameters. In such cases, we've two [APIs](https://github.com/meteorhacks/flow-router#api) to change them easily:

* `FlowRouter.setParams({postId: "postId"})`
* `FlowRouter.setQueryParams({comments: "no"})`

Visit FlowRouter [documentation](https://github.com/meteorhacks/flow-router) to learn more about these APIs.