---
navTitle: Server Errors
navSubTitle: Server side error tracking
title: Server Side Error Tracking
---
On the server side, Kadira tracks four types of errors:

* Method errors
* Subscription errors
* Server crashes
* Internal Meteor errors

All these types of errors will be sent to Kadira Error Manager automatically once you have connected your app to Kadira APM.

## Error Context

With Kadira Error Manager, you can view the context for these errors. See the following error thrown inside a method:

![Kadira Error Trace](https://cldup.com/ir_m4eYxQa.png)

You can see the usual error message and the stack. But now you can also see all the **activities** that took place in the error context. 

In the example above, you can see the actual database query invoked. You can even see currently loggedIn user and subscription parameters if you click on the "SHOW MORE" links.