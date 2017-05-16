---
layout: blog_post
title: Addon Packages for FlowRouter
category: meteor
summery: Initially popular community packages like useraccounts does not have support for FlowRouter. Now, it's no longer true and there are a lot of packages support FlowRouter out of the box. 
---

"My biggest question is what happens if I install a package like useraccounts that has Iron Router in it?"

![FlowRouter addon packages](https://cldup.com/QXkoQQ148S.png)

This was a common question when [FlowRouter](https://github.com/kadirahq/flow-router) was new. It's a real issue and it was one of the reason developers couldn't migrate their apps to FlowRouter. I'll tell you more about this in a second.

**So having a router is not enough. It needs the support of the community as well.**

For FlowRouter, we need two kinds of community packages:

1. Original packages that add more functionality to FlowRouter
2. Support from the existing packages that are available for Iron Router

## The Community Took up the Challenge

I am proud to say, the community embraced the challenge. Now we've a set of great packages that support FlowRouter as well.

* [zimme:active-route](https://atmospherejs.com/zimme/active-route): This can be used to check the active route.
* [useraccounts](https://github.com/meteor-useraccounts/flow-routing): This is a set of packages to handle the logic for user accounts.
* [Orion CMS](https://github.com/orionjs/orion): This is an admin package and a CMS for Meteor.

There are a few more add-on packages for FlowRouter. And we'll have more soon. [Search](https://atmospherejs.com/?q=flow%20router) Atmosphere to see them all.

## Introducing Router Layer

[Router Layer](https://github.com/nicolaslopezj/meteor-router-layer/) is a very interesting project. It helps package authors to add support for multiple routers. Even though different routers work differently, they have a subset of APIs that is similar. The [Router Layer](Router Layer) project is an abstraction for those APIs. 

Add-on package authors can use Router Layer instead of FlowRouter or IronRouter. Then Router Layer will take care of mapping the API to the actual router's API used inside the app. 

This project was created for the Orion CMS. But, I hope it can be used for a lot of other packages as well.

### What If project XXX still doesn't support FlowRouter?

Now things are pretty easy with the Router Layer package. Once you find such a package, follow these steps:

* If possible, fork it and use Router Layer instead of Iron Router.
* Then send a PR to the project.
* If not, create an issue asking the author to use Router Layer.

## Add-on API for FlowRouter

Although we need to have projects supporting both FlowRouter and IronRouter, there should be some original projects for FlowRouter as well. 

[Reaktor](https://github.com/kadirahq/meteor-reaktor) and [`arillo:flow-router-helpers`](https://atmospherejs.com/arillo/flow-router-helpersq) are two such examples.

These projects will extend FlowRouter to give it more features or make it easier to use. Today, we are releasing one such API to support the creation of add-ons for FlowRouter.

It's a notification that triggers whenever a user creates a route:

~~~js
FlowRouter.onRouteRegister(function(route) {
  // do anything with the route object
  console.log(route);
});
~~~

Click here to learn more about it.

We'll have more APIs soon. Just let us know what kind of APIs you need.

## Thanks! The Meteor Community Rocks

I believe that having a set of simple tools makes things simple and manageable. FlowRouter is simple and easy to manage. There will be more projects that add more functionalities for FlowRouter. They will be simple too. Now we are starting to see those projects.

Thank you all! 

Finally, I'm saying this again:

**Having a router is not enough. It needs the support of the community as well.**

