---
navTitle: Implementing Auth Logic and Permissions
navSubTitle: 
title: Implementing Auth Logic and Permissions
enableComments: true
---

Handling authentication and authorization logic is one of most common tasks in any app. In other words, we need to restrict some pages to a set of users.

Previously, we did this in the **router layer** (specifically with Iron Router). However, that's not a good design and we don't recommend it.

> If you handle auth logic in the router, you need to wait for data.
> Then, you need to manage the subscriptions and data at the route level.
> We’ve already [discussed](/academy/meteor-routing-guide/content/subscriptions-and-data-management) this.

**So, how we can implement auth-related logic with FlowRouter?**

The answer is, it’s simple. Let's do it in the **template/component layer**. This is the best approach for the auth logic, and it's very easy to implement.

## Auth Logic in the Template/Component Layer

In server-rendered apps(in the PHP era), if there is an unauthorized access, we can redirect the user to a login page or some other page. In Meteor, or in any single-page app, we can simply show a login screen to the user instead of redirecting them to another page. Or else, we can simply say: "You are not allowed to view this page."

Meteor has built-in tools to implement such logic. Let's give them a try.

Now we will add a functionality to our blog for adding new posts.

Here's the template we are going to use:

~~~html
<template name="addNewPost">
  {{#if authInProcess}}
    <p>loading ...</p>
  {{else}}
    {{#if canShow}}
      <p>This is the area for adding a new post</p>
    {{else}}
      <p>You are not authorized to view this page.</p>
      <p>Please <a href="/login">login</a> to view this page</p>
    {{/if}}
  {{/if}}
</template>
~~~

Here are the helpers we are going to use:

~~~js
Template.addNewPost.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    return !!Meteor.user();
  }
});
~~~

In the template layer, we need to show a loading screen while we load all the login information to the client. That's what the "authInProcess" helper does. Internally, it simply calls `Meteor.loggingIn()`, which will return true if there is an ongoing login process.

After we've completed the `authInProcess`, then we can check for a logged-in user. That's what we did with the `canShow` helper.

**So, it's seems like we need to do these check for every template. Isn't it?**

Technically yes. But, you can do this on the **layout level** to avoid that. You can also define common helpers and templates to handle these sitations like this:

~~~html
{{#onlyIfLoggedIn}}
  {{> addNewPost}}
{{/onlyIfLoggedIn}}
~~~

Then `onlyIfLoggedIn` template will be something like this.

~~~html
<template name="onlyIfLoggedIn">
  {{#if authInProcess}}
    <p>loading ...</p>
  {{else}}
    {{#if canShow}}
      {{> UI.contentBlock }}
    {{else}}
      <p>You are not authorized to view this page.</p>
      <p>Please <a href="/login">login</a> to view this page</p>
    {{/if}}
  {{/if}}
</template>
~~~

~~~js
Template.onlyIfLoggedIn.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    return !!Meteor.user();
  }
});
~~~

*We can easily implement the same logic in React.*

> You can access the complete code via GitHub
> * [For Blaze](https://github.com/flow-examples/flow-router-guide-example/tree/blaze-authentication)
> * [For React](https://github.com/flow-examples/flow-router-guide-example/tree/react-authentication)

## Implementing Permission Logic

In the above example, we only implemented authentication logic. However, we often need to implement permission (authorization) logic as well.

As an example, let's implement the edit post functionality in our blog.

In this case, users should be able to edit a post only if they are the owner of the post. Otherwise, they should not be able to edit the post. Let's implement this.

Here's the template. It's very similar to the previous one:

~~~html
<template name="editPost">
  {{#if authInProcess}}
    <p>loading ...</p>
  {{else}}
    {{#if canShow}}
      <p>This is the area for editing the post</p>
    {{else}}
      <p>You are not authorized to view this page.</p>
      <p>Please <a href="/login">login</a> to view this page</p>
    {{/if}}
  {{/if}}
</template>
~~~

Here's the subscription we used to get the relevant post for the client:

~~~js
Template.editPost.onCreated(function() {
  var self = this;
  self.postSubReady = new ReactiveVar();
  self.autorun(function() {
    var postId = FlowRouter.getParam('postId');
    var subHandle = self.subscribe('singlePost', postId);
    self.postSubReady.set(subHandle.ready());
  });
});
~~~

In our permission logic, we need to check for the owner of the post as well. Then we need to get the post to the client. So, we need to invoke a subscription like that above.

Other than invoking the subscription, we keep a ready state inside a ReactiveVar called "postSubReady". We'll be using it in the helpers:

~~~js
Template.editPost.helpers({
  authInProcess: function() {
    var postSubReady = Template.instance().postSubReady.get();
    return Meteor.loggingIn() || !postSubReady;
  },
  canShow: function() {
    var user = Meteor.user();
    if(!user) {
      return false;
    }

    var postId = FlowRouter.getParam('postId');
    var post = Posts.findOne({_id: postId});
    if(!post) {
      return false;
    }

    return post.owner === user._id;
  }
});
~~~

Now in the `authInProcess` helper, we need to check for both the login process and the subscription. Otherwise, we don't have data to implement the permission logic.

Then, in the `canShow` helper, we check whether the current post's owner is the logged-in user. That's all.

*We can easily implement the same logic in React.*

> You can access the complete code via GitHub
> * [For Blaze](https://github.com/flow-examples/flow-router-guide-example/tree/blaze-permissions)
> * [For React](https://github.com/flow-examples/flow-router-guide-example/tree/react-permissions)

#### Usage with alanning:roles package

It's quite common to use [`alanning:roles`](https://atmospherejs.com/alanning/roles) package to handle authorization/permission logic in a Meteor app. If you are already using it, there is an example app on how to use it with FlowRouter.

Have a look at it: [FlowRouter and Roles example](https://github.com/alanning/meteor-roles/tree/master/examples/flow-router).

## Redirecting after Successful Login

Sometimes, we may need to redirect users to a different page after the login process has completed. The best way to access that event is using `Meteor.onLogin()`. Using it, we can register a callback to run just after a successful login attempt.

This is how to use it:

~~~js
Accounts.onLogin(function() {
  var path = FlowRouter.current().path;
  // we only do it if the user is in the login page
  if(path === "/login"){
    FlowRouter.go("/");
  }
});
~~~

In the above example, we only redirect users to the home page ("/") if the user is in the login page. Here's the reason.

Sometimes, we can include the login form right inside the template as shown below. In such cases, if the user has logged in, we don't need to redirect them:

~~~html
<template name="editPost">
  {{#if authInProcess}}
    <p>loading ...</p>
  {{else}}
    {{#if canShow}}
      <p>This is the area for editing the post</p>
    {{else}}
      <p>You are not authorized to view this page.</p>
      <!-- render the login form here. -->
    {{/if}}
  {{/if}}
</template>
~~~

## Notes on Practical Usage

In the examples above, we've implemented the auth logic inside the individual templates. However, depending on your app, you can move this logic into the layout level and make it more generic.

You can also write helpers or ReactMixins to make things simple.

> We had an interesting [discussion](https://forums.meteor.com/t/question-to-mdg-building-routing-into-core/4378/37) on Meteor Forums where we talk about Template/Component level authentication and why we need that. Have a look at it.
