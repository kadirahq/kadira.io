---
layout: blog_post
title: How Q42 is using Kadira
category: user-story
summery: Q42 is a Dutch consultancy firm and this is how they use Kadira. They build apps for top companies like Google and Phillips.
---

[Q42](http://q42.com/) is a Dutch consultancy firm, which helps top companies like Google and Phillips to build web, mobile and IoT apps. They also help businesses to [jumpstart](http://q42.com/jumpstarts) ideas into products. [Tesloop](http://tesloop.com/) is an interesting Q42 jumpstart that is trying to build an inter-city transportation service using Tesla vehicles. 

For most of their production Meteor apps, Q42 uses Kadira to identify **performance issues and errors**. Some of those apps are available to the public and some of them are deployed on site at client locations.

![](https://cldup.com/mofeTcBfXJ.jpg)

## How they use Kadira

Q42 uses Kadira for both their public and on-site Meteor apps. They mainly uses Kadira to **optimize** latency. Q42’s head of US operations, [Rahul Choudhury](https://twitter.com/rahul), mentioned a recent occasion when he identified a latency issue using Kadira:

> It was a performance issue with Meteor's free hosting service when Q42.com was hosted there. After using Kadira, I was able to find that the latency issues were not Meteor's fault or my fault, but that MongoDB on the free hosting environment was getting throttled. 

> **The fix was to redeploy onto a different MongoDB database.**

Rahul used Kadira’s [tracing](https://kadira.io/platform/kadira-apm/traces) functionality to drill down and find the root cause.

![Q42 is using Kadira to Debug apps](https://cldup.com/rlyG3qO8L8.jpg)

## Q42 also uses our open-source projects

At Kadira, we not only build our core performance platform, we also maintain a wide range of [Meteor packages](https://github.com/kadirahq) that help developers in numerous way. That’s how we give back to the Meteor community. Q42 uses some of those key projects for their apps. Let’s hear from Rahul:

> Recently, I shipped a production Meteor app using Kadira, [Subs Manager](https://github.com/meteorhacks/subs-manager) (a stopgap for reducing the number of times we hit the server), [Flow Router](https://github.com/kadirahq/flow-router) (much simpler to use than Iron Router), [Fast Render](https://github.com/meteorhacks/fast-render) (not just for performance but for first-load UX), and deployed with [mupx](https://github.com/arunoda/meteor-up/tree/mupx) (easy to use while we wait for Galaxy).

He also added:

> So it's safe to say that outside of MDG itself, these tools are must-haves. Please keep going! You've been filling the gaps where MDG hasn't had a chance. 
> Would love to see your solution for server-side rendering as well. And keep integrating them into one family of packages that interoperate together. The simple philosophy is really "meteoric" and more package authors should use your approach.

Have a look at our [open-source](https://github.com/kadirahq) packages and use them with your app to build fast and efficient Meteor apps.