---
navTitle: With React
title: Using Meteor.subscribe Inside a React Component
enableComments: true
---

> We assume you are familiar with Meteor's React integration. If not, start [here](http://react-in-meteor.readthedocs.org/en/latest/).

Let's load the data for our `BlogPost` React component. Let's have a look at the `getMeteorData()` method:

~~~js
BlogPost = React.createClass({
  ...
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var postId = this.props.postId;
    var handle = Meteor.subscribe('singlePost', postId);
    if(handle.ready()) {
      data.post = Posts.findOne({_id: postId});
    }
    return data;
  },
  ...
});
~~~

In the above `getMeteorData` method, we get the `postId` from props and invoke the subscription inside it. When creating an instance of this BlogPost component, we passed the route's params as props. That's why we can see the `postId` inside props. Here's the code we used for this:

~~~html
FlowRouter.route('/:postId', {
  action(params) {
    ReactLayout.render(MainLayout, {content: <BlogPost {...params} />});
  }
});
~~~

With React, using route params as props is a good approach and it won't affect the performance of your app. However, in Blaze, it's an anti-pattern.

> Behind the scenes, `getMeteorData()` runs inside a `Tracker.autorun`. So, it'll stop older subscriptions as you invoke new subscriptions. See [this](https://meteorhacks.com/subscriptions-manager-is-here#why-subscriptions-manager) article for more information about subscriptions and autoruns.

Now, let's see how we can create our `render` method:

~~~html
BlogPost = React.createClass({
  ...
  getContent() {
    return (
      <div>
        <h3>{this.data.post.title}</h3>
        <p>{this.data.post.content}</p>
      </div>
    );
  },
  render() {
    return (
      <div>
        <a href="/">Back</a>
        {this.data.post? this.getContent() : <p>Loading...</p>}
      </div>
    );
  }
  ...
});
~~~

In JSX, there is no `if` equivalent, which is normally found in templating engines. So, an ideal way to show the loading state is with the ternary operator, as shown above.

> [You can access the complete code via GitHub](https://github.com/flow-examples/flow-router-guide-example/tree/with-react-subdata)