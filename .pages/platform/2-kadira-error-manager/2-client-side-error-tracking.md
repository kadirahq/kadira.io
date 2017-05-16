---
navTitle: Client Errors
navSubTitle: Client side error tracking
title: Client Side Error Tracking
---
Just as with server errors, Kadira will start to track client side errors automatically and send them to Kadira directly, rather than routing them  through your app. So, when a client error is being tracked, there is no impact on your app.

In the client side, we track a few different types of data, including:

* Error Message and Stack Trace
* Browser information
* LoggedIn userId
* URL
* Location

![Kadira Client Side Error Tracking](https://cldup.com/evu-hr9it6.png)

> The production app often uses minified code and doesn't include sourcemaps. For this reason, a stack trace is less useful here than in the development version, although it's still valuable.