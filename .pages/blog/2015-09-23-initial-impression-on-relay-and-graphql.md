title: Initial Impressions on GraphQL & Relay
category: graphql
summery: This is a detailed review of Facebook's two great projects: GraphQL and Relay. We also discuss about some suggestions for making them better.
---

Facebook recently made [GraphQL](http://graphql.org/) and [Relay](https://facebook.github.io/relay) open source, so now we can try them out. These are the two main components in Facebook's app architecture that focus on data management. They are in the very early stages.

Since we fixed some of Meteor's data-related issues, I'm really excited about these two projects. I played a bit with both of them and this is my experience and how I feel about them.

> I am a die-hard Meteor fan. So, I might talk in favor of Meteor. But I'll try to be open minded and avoid mentioning Meteor.

## What's GraphQL

Basically GraphQL is an **application layer query language**, which queries and mutates (or updates) data. You might think it's somehow related to a graph database. Yes, it has a good relationship with [graphs](https://goo.gl/9JgOxd), but it's not tied to a database.

Before looking at GraphQL, let's see what problems it's trying to solve:

1. Client-side developers should have a way to ask for the data they need.
2. Server-side developers should have a way to expose the data they have.
3. There should be an easy and efficient way to query data (the REST API consumes a lot of resources, especially with mobile apps).

**To clarify this, let's use Facebook as an example.**

Whatever happens in the client apps or in the backend, there are millions of users who want to use Facebook every day. Mostly importantly, there are tons of ways to access Facebook. It has an app for every major platform and those apps have multiple versions. Technically, there might be 100's of apps.

So, adding a new feature should **not** break any of these apps. 

That's where GraphQL is gonna help Facebook (and the rest of the developer community):

![GraphQL Architecture](https://cldup.com/oBxNtkj-kX.png)

With GraphQL, a client-side developer can write a query against a GraphQL server and fetch data. Let's say that in a different version of the app, that developer wants more information. With GraphQL, they simply change the GraphQL query and get the data they need. They never need to ask the server-side developer to create a custom data endpoint.

You can also get most of the data for a given view using a single request to the server.

We'll talk more about GraphQL in a moment.

## What's Relay?

[Relay](https://facebook.github.io/relay) is a JavaScript application framework that can talk to a GraphQL server. With Relay, client-side developers can define data needs for each of their components with GraphQL. 

Then when rendering a page, Relay aggregates all those GraphQL queries and invokes them against the GraphQL server very efficiently.

It can also mutate data and it supports cool features like optimistic updates. We'll also talk more Relay in a moment.

## How GraphQL Works

**GraphQL sits between the client apps and the actual data sources.** It's a kind of agreement between the client and the server with an efficient querying system.

It's independent of platforms and data sources. You can create a GraphQL server in Node, PHP or any other platform you like. Mobile apps, web apps and anyone else should be able to connect to a GraphQL server. Then they can query and mutate data.

But GraphQL does not comes with a transport layer. That’s the responsibility of a high-level framework, like Relay.

GraphQL also has a very good [type system](http://graphql.org/docs/typesystem/). It's basically built on top of graphs with the types you define. You might feel that you don't need to expose your dataset as a graph. But, if you think closely, 90% of the time your data schema can be structured as a set of graphs.

### Let's see some GraphQL

Enough talk. Let's see an example:

> Just for a moment, assume that I am the developer who built Product Hunt.

Here, I'm trying to get the data for a typical Product Hunt page (like [this](https://www.producthunt.com/tech/react-native-for-android)). This is how I'm going to get them with GraphQL:

```
{
  product(id: "react-native-for-android") {
    name, 
    link,
    votes,
    comments {
      text
    }
  }
}
```

So, it gives something like this as the result:

```
{
  "data": {
    "product": {
      {
        "name": "React Native for Android",
        "link": "https://facebook.github.io/react-native/",
        "votes": "167"
        "comments": [
          {
            "Huuuuge for cross-platform progress.",
          },
          {
            "Exciting stuff.",
          }
        ]
      }
    }
  }
}
```

Let's say, I am working on an upgraded version of Product Hunt and I need to display the author right next to the comment. To get that data, I simply change my GraphQL query like this:

```
{
  product(id: "react-native-for-android") {
    name, 
    link,
    votes,
    comments {
      text,
      author {
        avatar
      }
    }
  }
}
```

So, it's very easy to add features to the app without touching the server code or any other part of my app.

This is just the surface of GraphQL. Check out the [GraphQL docs](http://graphql.org/docs/getting-started/) for more information.

### What Does GraphQL Lack?

Everything in GraphQL looks good so far. But it's not the perfect solution.

One thing it's missing is the ability to update clients reactively. In the GraphQL spec, there is no way to subscribe and get updates. There have been some experiments and discussion on how to do so, but we don't have any examples yet.

Right now, to achieve real-time updates, we need to poll the server and get the changes.

### What's the Catch?

These days, we talk about isomorphic concepts and sharing code between the client and server.

At the same time, now we are talking about decoupling the client and the server. So, I was confused a bit. 

**But, Facebook is right.**

There should be a clear boundary between the client and the server with a common agreement. So, both parties can build and scale independently.

Isomorphic is not about sharing code between the server and the client. It's beyond that. 

For an example, you might want to share some of the stuff you wrote for the web and use it in iOS. Maybe you can share some of the code in every part of your system, including in the server. It doesn't need to be code every time. May be it's some data definition or a set of images. 

**Finally, I think isomorphic means sharing resources between platforms.**

> If you need to grab a snack, this is the time. We are gonna discuss more stuff.

## How Does Relay Work?

As I mentioned earlier, [Relay](https://facebook.github.io/relay) is an application framework that connects to a GraphQL server and queries and mutates data. It's built on top of React components and it has an express-compatible [network layer](https://facebook.github.io/relay/docs/guides-network-layer.html#content). But, it's possible to add custom network layers.

With Relay, you can express your data requirement for each UI component using GraphQL. Then, Relay will fetch them for you efficiently. It'll do the complex data management tasks such as:

* Mutations and handling changes (apply changes after a mutation)
* Optimistic updates (simulate mutation in the client, so the user doesn't need to wait for the server result to see the change they made)
* Data caching to reduce server round trips (simply reuse existing data)

If you are coming from Meteor, you’ll feel like these things are available by default in your app.

> Oops! Did I just mention Meteor? Sorry!

### The Good Parts of Relay

I really like the concept of defining the data requirement in the component itself. Relay can build GraphQL queries and decide what to fetch and when. That's brilliant. 

Let's look at an example:

(It's a simple blog.)

This is our `BlogPost` React component:

```js
class BlogPost extends React.Component {
  render() {
    return (
      <div className="post">
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.content}</p>
      </div>
    );
  }
};
```

Next, we define the data requirements using GraphQL:

```js
BlogPost = Relay.createContainer(BlogPost, {
  fragments: {
    // this is some GraphQL code. 
    // `fragment` keyword is used to create a subset of a type.
    // (which is Post in this case)
    post: () => Relay.QL`
      fragment on Post {
        title,
        content
      }
    `,
  },
});
```

Then, while loading the page, Relay will fetch these data for you:

Here's the **interesting** part. Let's say you want show the author right next to the title in the BlogPost component. Simply change the GraphQL query. It's that easy.

**There is no need to change anything anywhere in your code.**

### What's Not Ideal in Relay?

I like the core concept behind Relay. But I don't like how it does mutations and handles changes.

**Let's look at the problem first.**

If Relay is all about querying data, there is no issue at all. Things start to blur when you call mutations. With a mutation, you update some part of your graph. Relay needs to get the changes done by the mutation and apply them into the app.

For instance, let's say in the above blog example, we called a mutation that adds a new comment. We keep both the comment count and the comments separately. So, for that mutation, we need to update two places in our graph.

The client needs to get these updates after the mutation and apply them correctly. This is a big issue.

#### How Relay Handles Mutation Changes

In Relay, we do this with fat queries. So, for every mutation, we need to define all the changes it makes as a special GraphQL query like this:

(We need to do this in the client.)

```
  getFatQuery() {
    return Relay.QL`
      // Here when we add a new comment we need 
      // to get the new comment and the count again
      fragment on Post {
        comments,
        commentCount
      }
    `;
  }
```

**I think this is a wrong decision.**

Now the client-side developer needs to know the logic behind the mutation and use it inside the client code. It would have been better if Relay could figure it out automatically and apply the changes.

To do this, GraphQL could expose some information to Relay via its [introspection](http://graphql.org/docs/introspection/) functionality.

This would **simplify** the client-side developer's job.

#### How Relay Handles Optimistic Updates

With optimistic updates, we try to simulate the server-side mutation inside the client. Thus, we can reflect the UI changes without waiting for the server-side response. This concept is also known as [latency compensation](https://meteorhacks.com/introduction-to-latency-compensation).

If we need to get optimistic updates in Relay, we need to run a simulation of that mutation inside the client. To do this in Relay, the **client-side developer** needs to write the logic.

But actually, this is the job of the server-side developer. It'd be great if the server-side developer could include these simulations while defining the mutation on the server using some sort of GraphQL.

This would simplify the client-side developer's job. They would simply have to call the mutation and Relay would know how to simulate and update the UI.

<hr />

## Suggestions

Finally, I think Facebook did an amazing job with GraphQL and Relay. However, Relay needs some improvements. Here are my suggestions:

1. Allow the definition of mutation updates and simulations (mutation metadata) in the server. Make it a part of GraphQL.
2. In the client, get the mutation metadata using GraphQL's introspection functionality.
3. Then, Relay can apply the simulation and the data changes.

I'm really interested in these suggestions and I’m looking forward to experimenting on them. Let's see what we can do.

<hr />

These are some of my thoughts after a few days of experience of GraphQL and Relay. I might be wrong on some points. Let's discuss.