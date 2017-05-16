---
navTitle: With Blaze
title: Using Template-Level Subscriptions with Blaze
enableComments: true
---

Let's load the data for our blog post:

~~~js
Template.blogPost.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var postId = FlowRouter.getParam('postId');
    self.subscribe('singlePost', postId);  
  });
});
~~~

As shown in the above onCreated callback, it's important to get the `postId' using `FlowRouter.getParam`, rather than getting it via Blaze's data context. This will minimize unwanted template destruction and re-creation.

Now, whenever the `postId` parameter changes in the route, it'll get the new data and render it on the page.

> In the example above, we are running our subscriptions inside an autorun. This will automatically stop older subscriptions as we create new subscriptions. You can learn more about it in [this](https://meteorhacks.com/subscriptions-manager-is-here#why-subscriptions-manager) article.

Here's the related template helper that gets the data:

~~~js
Template.blogPost.helpers({
  post: function() {
    var postId = FlowRouter.getParam('postId');
    var post = Posts.findOne({_id: postId}) || {};
    return post;
  }
});
~~~

In the `post` helper above, it also get the correct content as the `postId` changes in the URL.

Finally, here's the template:

~~~html
<template name="blogPost">
  <a href="/">Back</a>
  {{#if Template.subscriptionsReady}}
    {{#with post}}
      <h3>{{title}}</h3>
      <p>{{content}}</p>
    {{/with}}
  {{else}}
      <p>Loading...</p>
  {{/if}}
</template>
~~~

Here, [`Template.subscriptionsReady`](http://docs.meteor.com/#/full/Blaze-TemplateInstance-subscriptionsReady) is a special helper that comes with Blaze. It shows whether the subscriptions invoked in the template are ready or not.

> [You can access the complete code via GitHub](https://github.com/flow-examples/flow-router-guide-example/tree/with-blaze-subdata)