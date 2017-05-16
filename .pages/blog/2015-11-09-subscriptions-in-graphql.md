title: State of Subscriptions in GraphQL
category: graphql
summery: Subscriptions for GraphQL are coming. This is an overview of the functionality and a peek into a possible implementation.
---

[GraphQL](http://graphql.org/) is one of the best ways to define APIs and expose them. It was invented at Facebook and they made it open source earlier this year. Currently, GraphQL allows us to query and mutate our data. But it's not **yet** possible to subscribe and get notifications or reactively watch for a query.

> If you are not familiar with GraphQL yet, follow our [LearnGraphQL](https://learngraphql.com/) course.

## Early Discussion on Subscriptions

Facebook's version of GraphQL has support for subscriptions, which they haven’t added to the open-source version. I hope they look at feedback from the community before they introduce it to the public.

Recently, [Dan Schafer](https://twitter.com/dlschafer), one of the co-creators of GraphQL, wrote a [blog post](http://graphql.org/blog/subscriptions-in-graphql-and-relay/) on how they use GraphQL subscriptions at Facebook. They use an events subscription model that works for any app.

**Here's how it works.**

![Subscriptions In GraphQL](https://cldup.com/SGJ72NjMxo.png)

Let's say we've a blog app. On each page, we have a comments section, which we need to update in real time.

* We can fetch the initial set of comments using a GraphQL query.
* Then, we'll get new comments via a subscription.
* When we receive a new comment, we can show it on the UI.

**So, what happens when someone deletes a comment?**

We need listen to a new subscription that sends deleted comment IDs. Then we can decide what to do.

Likewise, we can listen to any subscriptions and take actions.

## Comparison with a Live Query System

So the question is, how do GraphQL subscriptions differ from a live query system like [Meteor's data layer](https://www.meteor.com/livequery)?

Let's talk about how a live query system works normally. 

In such a system, you subscribe to a query. 

* It first gets a copy of the current state of the query.
* Then it adds it to the local cache.
* If something changes related to the query, those changes go to the client, which will update the local cache.

Meteor has a low-level protocol called DDP, which is used to send these changes to the client.

**So, how do GraphQL subscriptions differ from this?**

With GraphQL subscriptions, the developers can decide what kind of stuff they need to watch for and then decide what to do. On the other hand, this allows GraphQL to work on any kind of data source. (That's one of the promises of GraphQL.)

With a LiveQuery system, the system needs to watch for all the changes and merge them correctly. As the mutations grow, this is very hard to built in practice and very costly. Live Queries also subjective to the backend data source and so hard to implement and maintain.

If someone wants to, they can build a live query system on top of GraphQL. If he can’t implement some queries as live queries, he can listen for some events (but not all of them) and react to them. With that, he can build a decent realtime system.

## Current Status

Subscription support has not yet been added to the GraphQL specification, but it's been [added to graphql-js](https://github.com/graphql/graphql-js/pull/189) and now the community have started to experiment with it.

There are some ongoing discussion on the `#subscriptions` channel on GraphQL Slack and here's a [summary](https://gist.github.com/OlegIlyenko/a5a9ab1b000ba0b5b1ad) of what's happening there. 

Currently, GraphQL subscriptions are still in the experimental stage and we may have something solid soon.

## Suggested Implementation

This is what we at [Kadira](https://kadira.io/graphql) think subscriptions in GraphQL should look like. 

We need to keep in mind two key points:

* GraphQL does not know about data sources.
* GraphQL does not know about the transport layer.

### Definition

This is how we could define the backend for the subscription:

~~~js
const SubscriptionType = new GraphQLObject({
    name: "CommentSubscription",
    fields: {
        newComments: {
            type: Comment,
            description: "Send newly added comments",
            args: {
                postId: {type: GraphQLString}
            },
            start(subscriptionId, {postId}) {
                const onComment = comment => {
                    Transport.push(subscriptionId, comment);
                };
                const key = subscriptionId;
                const type = 'newComment';
                MyQueueService.on(key, type, {postId}, onComment);
            },
            stop(subscriptionId) {
                MyQueueService.removeListener(subscriptionId);
            }
        }
    }
});

const Schema = new GraphQLSchama({
    name: "BlogSchema",
    subscription: SubscriptionType
});
~~~

Here, GraphQL will invoke the `start` function when the user initiates the subscription. GraphQL will assign a `subscriptionId` for us and also send it to the user. 

We can use this `subscriptionId` to push events to the transport layer. We also utilize it as the registration key for our internal queue where we watch for events.

When the user stops the subscription, the `stop` function will get invoked with the `subscriptionId`. We use that to clean up the watcher we created on the `start` function.

### Client Invocation

This is how a client can listen for a subscription:

~~~js
// Initial the subscription
const res = async TransportLayer.sendQuery(`
    subscription _ {
        subId: newComments {
            id,
            text,
            author {
                name
            }
        }
    }
`);

// Watch for the events
TransportLayer('onSubData', res.subId, comment => {
    // do something with the comment
});
~~~

And this is how we can stop the subscription:

~~~js
const subId = 'the-subcription-id';
async TransportLayer.sendQuery(`
    stopSubscription(id: ${subId})
`);
~~~

<hr />

This is just a suggestion for how subscriptions could be implemented. We hope the final implementation will be something like this or close to it.

After support for subscriptions has arrived at GraphQL, we may see a lot of cool add-ons and projects utilizing it.