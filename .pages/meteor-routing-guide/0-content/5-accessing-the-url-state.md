---
navTitle: 
navSubTitle: Accessing the URL State
title: Accessing the URL State
enableComments: true
---

Accessing URL parameters is common in our app. FlowRouter has a few **reactive** APIs for accessing the URL state very efficiently:

* `FlowRouter.getParam("paramName")`
* `FlowRouter.getQueryParam("queryParamName")`
* `FlowRouter.getRouteName()`

These APIs return the value based on the current URL state. If they run inside a `Tracker.autorun`, it'll watch for changes and rerun the autorun if needed.

In Blaze, template helpers run inside a built-in `Tracker.autorun`. So, you can use the above APIs to get the URL state reactively.

In React, you can use these APIs inside the `getMeteorData` method. However, for React apps, most of the time we pass the URL state (params) via React props. So, we don't need to use these APIs normally.

### Usage Example

For example, let's say you are using FlowRouter.getParam() inside a template helper like this:

~~~js
Template.blogPost.helpers({
  sidebar: function() {
    var category = FlowRouter.getParam("category");
    var cursor = Posts.find({category: category});
    return cursor;
  }
});
~~~

Let's imagine our current route's path definition is something like:

~~~
/blog/:category/:postId
~~~

Then, if we change the `category` parameter, the above helper `sidebar` will be rerun again. However, if we change the `postId` param, our helper won't run at all.

This gives better UI performance for apps written in Blaze.

### Watching Every Route Change

Sometimes we need to watch every path change regardless of its state. This is how:

~~~js
Tracker.autorun(function() {
    FlowRouter.watchPathChange();
    var context = FlowRouter.current();
    // use context to access the URL state
});
~~~

This autorun will rerun for every route or URL change in our app. We can access the URL state using `FlowRouter.current()`.

This is what's inside that object:

~~~js
{
    path: "/blog/meteor/hello-world?comments=yes",
    params: {category: "meteor", postId: "hello-world"},
    queryParams: {comments: "yes"}
    route: {name: "blogPost"}
}
~~~
