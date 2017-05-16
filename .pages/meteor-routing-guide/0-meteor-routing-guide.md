---
navTitle: Meteor Routing Guide
navSubTitle: Overview
title: Routing Guide for Meteor Apps
enableComments: true
---

**Routing** is one of the core functionalities used in any kind of Meteor app. 

> When it comes to routing, we can't discuss about it without mentioning **subscriptions and data management**.

In this guide, we will suggest a few successful **patterns** for managing routes and subscriptions.

We use [FlowRouter](https://github.com/meteorhacks/flow-router) as the base for these patterns. Most of these patterns can be applied for both [Blaze](https://www.meteor.com/blaze) and [React](http://facebook.github.io/react/) alike. Sometimes there are differences when applying these patterns in these rendering engines, but the core idea will be the same.

We'll also talk about some of the **anti-patterns** and the alternatives you can use instead. Here are a few such anti-patterns:

* Route-level subscription management
* Data management in the router
* Managing auth logic inside the router

At both the community and the platform levels, Meteor has **evolved** a lot. There are new APIs and we have found new ways to address common problems. So, that's why we describe the patterns above as anti-patterns.

[Let's get started](/academy/meteor-routing-guide/content/introduction-to-flow-router).