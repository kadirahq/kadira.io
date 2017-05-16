title: Introducing Blaze Plus: The Next Generation of Blaze Templating
category: meteor
summery: We are introducing props and state management functionality to Blaze. With them, you will be able to write blaze apps in very interesting ways.
---

Meteor's Blaze was one of the awesome pieces in the Meteor stack in the early days. Recently, other frameworks like React have started to get a lot of traction, even in the Meteor [community](https://forums.meteor.com/t/preview-of-official-react-support/6150) itself. So, does this mean that this is the end of Blaze?

I can't answer that, but many people who have written apps in Blaze are trying to stay with Blaze. One good example is the [Telescope](http://www.telescopeapp.org/) app. (I have had some pretty interesting discussions with [Sacha](https://github.com/SachaG) about this.)

## But We Need a Blaze Upgrade

Recently, how we build apps has changed a lot. React introduced techniques like passing data from the root to the bottom and new architectures like [Flux](https://facebook.github.io/react/docs/flux-overview.html).

At Kadira, we really like React's data-passing concept. Using it, you can have a root component at the top that calculates all the data needed and passes it to the children: 

![Data Passing From the Top](https://cldup.com/qH2g6dBP-y.png)

So, whenever any data changes, the whole dataset will be passed to the bottom and the children will update themselves accordingly. 

This is efficient in React because of its virtual DOM. But in Blaze, this is inefficient. That's because, whenever any data changes, the whole template will be re-rendered. Which leads to cascade re-renders.

## Introducing Blaze Plus

This is the problem and we are trying to fix it with **[Blaze Plus](https://github.com/kadirahq/blaze-plus/)**. Blaze Plus introduces props and state management functionalities to Blaze. Now you can pass data to the bottom of the tree without re-rendering templates.

Let's look at some Blaze Plus code:

```html
<!-- This is our templates -->

<body>
  {{> App}}
</body>

<template name="App">
  <!-- This is the starting point of the Magic functionality -->
  {{>$ template="Welcome" user=prop$getUser}}
</template>

<template name="Welcome">
  <span>Hello, </span> {{getName}}
</template>
```


```js
// This is place we get data in the top of the tree
Template.App.helpers({
  getUser: function() {
    var name = Session.get("name") || "Arunoda";
    return {name: name};
  }
});

// This is how we get data
Template.Welcome.helpers({
  getName: function() {
    // getting props via Template instance
    var props = Template.instance().props;
    return props.user().name;
  }
});
```

Watch this video to witness Blaze Plus's power:

<iframe width="640" height="480" src="https://www.youtube.com/embed/Gaz6S75Qo6c?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen="1">
</iframe>

If you would like to learn more about Blaze Plus, visit the [GitHub Repo](https://github.com/kadirahq/blaze-plus/).

## Can I Use This?

We really like this concept and we have been using the same technique in production for a while with [Flow Components](https://github.com/meteorhacks/flow-components/). Now we wanted to make it available for all Blaze apps and it may be merged into core at some point.

So, you can start using this today. But if you got any issues, we will be happy to fix them :)

## Why Did We Really Build This?

We had no plans to publish something like this. But there were concerns about the lack of data context in [FlowRouter](https://github.com/kadirahq/flow-router). We removed the data context from the router because it kills the performance of apps.

However, setting some data at the router level is a pretty good idea. (I'm not talking about subscription data, but data like route params and so on.)

Now with Blaze Plus, we can solve this issue.

Have a look at [this](https://github.com/flow-examples/flow-router-blaze-plus-example) sample FlowRouter + BlazeLayout app, which utilizes Blaze Plus to pass data:

<hr />

Try using Blaze Plus with your app and let us know what you think of it.