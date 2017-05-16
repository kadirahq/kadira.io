title: Flow Router 4.0 & Future of Routing in Meteor
category: meteor
summery: What's the official router in Meteor? Let me answer this question.
---

Let me answer the question everyone in the Meteor community is looking for.

> What's the official router in Meteor?

Right now, MDG and the community are working on a project called [Meteor Guide](https://forums.meteor.com/t/new-mdg-project-the-meteor-guide/10873), which recommends [Flow Router](https://github.com/kadirahq/flow-router) as the router. So, it's safe to assume that Flow Router is the router of choice in Meteor.

## The Current Status of Flow Router

![Flow Router](https://cldup.com/j_UWzlM1vP.jpg)

The current version of Flow Router (v2.x) is **very stable** and it's been adopted by a lot of big projects, including [Telescope](http://www.telescopeapp.org/blog/telescope-v025-flowscope/), [Wekan](http://wekan.io) and MDG's [Galaxy](https://galaxy.meteor.com/) web app.

We have also [released](https://atmospherejs.com/kadira/flow-router-ssr) an experimental version of Flow Router with server-side rendering (SSR). We’ve used it for [kadira.io](https://kadira.io) for more than 3 months and it's doing a pretty good job. Our experiment is a success and now is the time to make it stable. That's where Flow Router 4.0 comes in.

Flow Router is strictly opinionated about routing and we forced you to handle auth logic in the template level. That's confusing for some developers. But's it's not going to change and we did so for a technical reason. We talk about it in the [Meteor routing guide](https://kadira.io/academy/meteor-routing-guide/content/implementing-auth-logic-and-permissions) and you can also look at this [issue](https://github.com/kadirahq/flow-router/issues/344) for more information. I'll write a detailed post about auth logic in the coming weeks.

## Flow Router 4.0

Flow Router 4.0 is the next major release and we may launch it in January 2016. Here are the top features it'll bring and some of the major changes.

### Server-Side Rendering

You can use server-side rendering for a few reasons. It can give better SEO support and fast page loads. We take SSR very seriously. However, SSR can cause security issues as well as performance issues in your app. We'll take care of them by understanding subscriptions in the components and with features like caching.

You don't need to use SSR for all of your routes. Normally, you don't need SSR for the logged-in areas in your app. For that, you can use the fast-render only mode, where the server sends only the data to the client without the HTML.

For all of these, you don't need to worry about anything. You just write your app and Flow Router will do the rest. And it's highly configurable.

### Support for Meta Tags and Other SEO Tags

With Flow Router 4.0, you will easily be able to inject meta tags and other SEO-related tags into your app. This will give much better visibility of your app in search engines and when sharing links in Twitter, Facebook and other social media sites.

### Defer Script Loading

This comes along with the SSR support. With it, HTML will be delivered to the client before loading JavaScript. This makes for very fast page loads. You can see it with any page in <https://kadira.io>. Try reloading this post or looking at the HTML source.

### Server-Side Redirects and 404

Even though we won't support server-side routing, redirects and 404 handling are pretty important for any app. So, you'll be able to manage them very easily with Flow Router 4.0

### SSR for Blaze

Flow Router's SSR implementation is independent of the UI framework. But, currently we've only tested it with React. It's technically possible for it to work with Blaze, but we need some support from Blaze for that. We are also not sure about the future of Blaze. Therefore, we’re not sure we'll provide SSR support for Blaze when we release FlowRouter 4.0. But it's technically doable.

### No Subscription Registration

Flow Router does not manage subscriptions. But it does [subscription registration](https://github.com/kadirahq/flow-router#subscription-management). We should not have added this feature to Flow Router. We prefer [template/component-level](https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management) subscriptions instead. So, we are removing subscription registration support from Flow Router 4.0.

However, if you want to use similar functionality, you can use the next version of [SubsManager](https://github.com/kadirahq/subs-manager). It'll have the subscription registration functionality.

## Development

We've already started the development of Flow Router 4.0. Check the [`ssr`](https://github.com/kadirahq/flow-router/tree/ssr) branch. We are also maintaining an issues list, which is available [here](https://waffle.io/kadirahq/flow-router).

## How Can I Help?

We need your help, whether it's big or small. Here are some ways you can help us:

* When you are asking a question, follow these guidelines:
    - If it's a general question, ask it in the Meteor forums.
    - If it's a bug report or a feature request, then submit an issue on GitHub.
* Help us by answering questions on Meteor forums and GitHub.
* Write blog posts, articles, and make videos to show how you use Flow Router.
* Create packages to extend the use of Flow Router.
* Use the latest versions of Flow Router and help us to test it.
* If you’d like to help us in the development, drop me a message (arunoda [at] kadira.io).

We hope Flow Router 4.0 will be good for the Meteor community, and we are looking at what we can add to Flow Router 6.0.
