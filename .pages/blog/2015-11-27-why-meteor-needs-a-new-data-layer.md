title: Why Meteor Needs a New Data Layer?
category: meteor
summery: Meteor has a LiveQuery system on top of MongoDB. Do we need a new data layer? 
---

Meteor was originally [launched](https://news.ycombinator.com/item?id=3824908) in early 2012 and now it's almost 4 years old. From the very beginning, Meteor has stayed with MongoDB. Meteor has an oplog based LiveQuery system to make real-time updates efficiently. Down the road, Meteor has also had various performance improvements, thanks to MDG and the community contributors.

Okay. Sounds like we are having a good time with Meteor and MongoDB. Why do we need a new data layer?

**Let’s discuss.**

### Mongo and LiveQuery limitations

At the initial stage of our apps, the MongoDB-based LiveQuery system worked pretty well. Even with a somewhat big production app, we could deal with MongoDB without any issues.

But a problem arises when we are getting a lot of writes. These writes may be from the Meteor app itself or from some other service. All the oplog changes will be sent to each instance of Meteor regardless of whether they are necessary. That's the biggest bottleneck in scaling Meteor apps.

> There are some tricks we can use to avoid this, but they are hacks that work for some apps, but not for all.

So, the problem is not with MongoDB. The Meteor LiveQuery system can't keep up with MongoDB. If MongoDB had a built-in LiveQuery system, that could be a proper fix. But that's not going to happen anytime soon.

### We need to work with multiple data sources

As our app grows, we need to work with multiple data sources. One database can't meet all the needs. So, we must have a way to work with different data sources.

Right now, we could use Meteor methods or a custom publication that works with non-MongoDB data sources (that's what we are doing at Kadira to get the data for charts). 

However, we need to map those data to MongoDB's data format and go through Meteor's server-side merge box (which is costly).

> There is also a very promising project called [AnyDB](https://github.com/ccorcos/meteor-any-db). We could use that too.

### LiveQuery systems are hard to implement and they are complex

These days, users expect to interact with their apps in real time. LiveQuery systems make it simple for us to build real-time apps.

Before we start our discussion, let's see what we mean by a LiveQuery system.

> How does a LiveQuery system work?
> 
> * You simply invoke a query to the server.
> * It sends you the current result.
> * When something changes in that query, the server sends the changes to the query.
> * The client responds accordingly.
>
> AFAIK, Meteor is the only popular LiveQuery system.

Nevertheless, LiveQuery systems come with a cost. Implementing a LiveQuery system is hard. It also takes a lot of computing power to detect those changes in the app layer. 

For example, the app needs to detect all the writes that affect each of the queries and get the changes. Moreover, there are a lot of edge cases that LiveQuery systems should consider.

**Now this is the question**

Can MDG or the community build and maintain Live Query systems for all the popular databases?

> There have been a few [attempts](https://www.compose.io/articles/meteor-sql-and-other-databases/#meteorpostgresql) to build a SQL LiveQuery system for Meteor. But they all have their own problems and limitations. MDG has also [tried](http://info.meteor.com/blog/an-early-look-at-sql-in-meteor) to do it, but we haven’t had any positive updates about it.

### Do we need a LiveQuery system?

So, now we know that LiveQuery systems are hard to implement. So the question is, do we really need a Live Query system?

I'm not going to answer this question directly. But, I'll will give you some use cases.

At Kadira, our charts are somewhat real time. They update every minute. We don't have a LiveQuery system for it. We simply poll the server every minute to get the new data.
For us, that works pretty well and scales great. Also, no one has ever complained and asked for chart updates every second.

I recently had a discussion with one of our customers who maintains a chat app. He is seeing issues in Meteor's LiveQuery system. For this app he don't need a LiveQuery system, he just needs to listen to new chat messages and show them on the UI. He could use some queuing service like Kafka to get these messages in real time. So, basically, if there were a built-in event notification system, that would be the best solution for him.

### A data schema as the core

When building a huge app, a schema is important. It creates a contract between the server and the client. We could use such schemas and build tools around them (like a forms builder, autocompleting editors, better debugging tools and so on).

Currently, there are a few community packages we can use to create schemas. They come with their own pros and cons. 

But this is a non-issue compared to other issues.

## What do we really need as a data layer?

We can't stick with one database. We need to use different data sources in the server. Also, we can't stick to one UI framework, since we might need to use React, Blaze, Angular or something else. With each of those UI frameworks, we need to use different architectures to build apps.

>For example, we won't use Flux with Angular.

It's not like we need to use all of these in a single app, but different developers may want to use different frameworks and data sources.

So, for the **core data layer**, we need some infrastructure that is independent of data sources and UI frameworks. On top of it, we can build bindings for data sources and UI frameworks. First, have a look at this diagram:

![New Proposed Data Layer for Meteor](https://cldup.com/YW2HSr2X3D.png)

In the above diagram, the components in the red box are the core data layer. Around the core data layer, we can build add-ons. We can build those add-ons in the server as well as in the client.

This new proposed data layer uses an event-based system for real-time updates rather than LiveQueries. It will also handle optimistic updates. Using it, as app developers we may have to do some more stuff, but it make things simple and it is easy to scale.

## GraphQL?

In the above diagram, I didn't mention any specific technology. But [GraphQL](https://learngraphql.com/) seems like a promising solution because it's an amazing application-level query language. It also comes with some useful tools, like [GraphiQL](https://github.com/graphql/graphiql).

GraphQL's subscription system also recommends using an event-based system rather than a LiveQuery system. So, it seems like we are on the same page.

**So, I hope now you have a question. Why don't you just use GraphQL instead of Meteor?**

That's because GraphQL is just a query language and a [specification](https://facebook.github.io/graphql/). It doesn't know about the transport layer and how to communicate with data sources. When we are building an app, we need to connect a lot of pieces together. That's where a platform like Meteor can play a major role here.

## Why not using Relay?

This is a good question. [Relay](https://facebook.github.io/relay/) is Facebook’s application framework for React. It's also a very efficient GraphQL cache. However, it's not as easy to use as working with Meteor and it's only for React.

Again, before you work on a Relay app, you need to build some logistics on your own. So, it won't be an experience like Meteor.

## So, with all these changes what actually is Meteor?

![](https://cldup.com/sy3EWQAtXo.png)

We had Blaze; now that’s going to be [replaced](https://forums.meteor.com/t/next-steps-on-blaze-and-the-view-layer/13561/1) with Blaze2, which will be a thin wrapper around React. In this post, I'm talking about a new data layer. So, what exactly is Meteor?

> It's the best place to build apps in JavaScript. You can think of it as a customizable boilerplate used by many developers. It also comes with support and it has tools to deploy, monitor, and maintain. 

That's how I think about Meteor and I hope that's the vision of MDG as well.

## What's next?

So, I proposed a new plan for a data layer. But, it's not like we can jump to it right now and build it in a week. We need to discuss.

Maybe we need a hybrid system along with the existing LiveQuery system.

What do you think?