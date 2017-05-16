---
navTitle: Event Stream
navSubTitle: Watch key events happening in your app 
title: Watch Key Events Happening in Your App 
---

Kadira Debug **Event Stream** shows every **key event** happening in your app. These events include route changes, methods and subscriptions, data updates, DOM events, and many other key events.

It also comes with a filter where you can select the event you really need to see.

![Kadira Debug Event Stream](https://cldup.com/h7GLf73sxL.png)

Here's a list of all event types and their meanings:

* Route – A route changes in your app
* Sub – Subscription you invoke in your app
* Ready – When the server responds back with a message that the subscription is ready
* Unsub – Request to unsubscribe a subscription
* Nosub – When the subscription gets stopped
* Method – Method call you invoke in your app
* Updated – When the server sends the Updated message related to a set of methods. See this article about [latency compensation](https://meteorhacks.com/introduction-to-latency-compensation) for more information about this.
* Live Updates – The data updates coming from the server
* HCR – When a Hot Code Reload happens in your app
DOM Events – All the DOM Events inside Blaze templates

