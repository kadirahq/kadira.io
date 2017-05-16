title: GraphQL vs Relay
category: graphql
summery: Are GraphQL and Relay the same thing? Can we use GraphQL without Relay? Here’s the answer.
---

If you are familiar with [GraphQL](http://graphql.org/), you have probably heard about [Relay](https://facebook.github.io/relay/) and vice versa. But sometimes these products are treated as the same thing. 

![GraphQL vs Relay](https://cldup.com/uhBzqnK002.png)

## The Difference 

The difference is clear. GraphQL provides a way to model and expose data in your app. You can use it on top of any kind of data source and use it with any kind of transport layer.  

On the other hand, Relay is an efficient client-side data-fetching technology built for React. It talks to a GraphQL Schema to get data. Relay also has a server-side part that adds some features on top of GraphQL. 

> If you haven’t tried GraphQL yet, give it a try with our [Learn GraphQL](https://learngraphql.com/) course. You can complete it under 2 hours.

## Can I use GraphQL without Relay?

In other words, can I use GraphQL with Angular, Ember, Redux, or even with just React?

Of course! You can simply replace your existing data-fetching code to use GraphQL. 

For example, let's say we have a to-do app. We have been using a set of REST APIs to interact with the server. Instead of using REST, let’s use GraphQL over HTTP. 

Here are a couple of examples:

* A Todo app written in [pure React and GraphQL](https://github.com/kadira-samples/react-graphql-todos) 
* A Todo app written in [Angular and GraphQL](https://github.com/kadira-samples/angular-graphql-todos)

## What Next?

Here, I showed you some sample apps using GraphQL. When you use it with a real app, you may need more features, such as caching, optimistic updates, and authentication.

You can definitely use GraphQL with any front-end technology you are using right now. The Relay team is also [thinking](https://github.com/facebook/relay/wiki/Roadmap#future-enhancements) about separating the GraphQL cache inside Relay. At this time, though, that’s not a high priority.

Anyway, we hope you find it useful to have a UI framework with an independent JavaScript client for GraphQL. I think we'll have something like that soon.