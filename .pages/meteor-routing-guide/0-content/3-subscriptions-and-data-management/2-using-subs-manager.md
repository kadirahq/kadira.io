---
navTitle: Using SubsManager
title: Using SubsManager to Improve Performance
enableComments: true
---

[SubsManager](https://github.com/meteorhacks/subs-manager) is a subscription caching mechanism, which reduces the server load and improves page load speed when viewing previously visited content in your app.

It caches subscriptions, not the data directly. So, it caches data for individual subscription and it receive live updates in the background as well.

> In practice, having a few more subscriptions open is better than stopping and creating subscriptions. That's how SubsManager improves server-side performance.

## Adding SubsManager support for React

Adding SubsManager support for React is very simple. First, you need to create an instance of SubsManager inside your app (outside your component):

~~~js
PostSubs = new SubsManager();
~~~

That SubsManager instance will keep our `singlePost` subscriptions.

Now, simply use `PostSubs.subscribe` instead of `Meteor.subscribe` inside `getMeteorData`.

> [You can access the complete code via GitHub](https://github.com/flow-examples/flow-router-guide-example/tree/with-react-subsmanager)

** Notes **
If you are using more the one subscription inside `getMeteorData`, create a SubsManager instance for each of them. Otherwise, you might see data flickers in the UI.

That's because, whenever a new subscription is added to SubsManager, it'll mark the ready state of that SubsManager as false.

To learn more about SubsManager, have a look at the [SubsManager](https://github.com/meteorhacks/subs-manager) documentation.

## Adding SubsManager support for Blaze

For Blaze also, we need to create a SubsManager instance to keep subscriptions:

~~~js
PostSubs = new SubsManager();
~~~

Using SubsManager with Blaze is identical to how it’s done with React, but you won't be able to use `Template.subscriptionsReady`. Instead you need to create your own subscription-ready helper:

~~~js
Template.blogPost.onCreated(function() {
    var self = this;
    self.ready = new ReactiveVar();
    self.autorun(function() {
        var postId = FlowRouter.getParam('postId');
        var handle = PostSubs.subscribe('singlePost', postId);
        self.ready.set(handle.ready());
    });
});
~~~

In the above onCreated callback, we've used a ReactiveVar called `ready` to keep track of the subscription's ready state. We've assigned it to the template instance.

Then we simply use `PostSubs.subscribe` instead of `self.subscribe`.

Now, let's create our template helper to get the subscription's ready state:

~~~js
Template.blogPost.helpers({
    postReady: function() {
        return Template.instance().ready.get();
    }
});
~~~

That's it. Now, simply use `postReady` instead of `Template.subscriptionsReady`

> [You can access the complete code via GitHub](https://github.com/flow-examples/flow-router-guide-example/tree/with-blaze-subsmanager).

