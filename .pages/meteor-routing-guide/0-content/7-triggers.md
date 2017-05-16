---
navTitle: 
navSubTitle: Manipulate and Monitor Routes Via Triggers
title: Manipulate and Monitor Routes Via Triggers
enableComments: true
---

For most apps, it's very important to monitor routes and perform actions between routes. Middleware is commonly available functionality for doing this.

In FlowRouter, we have triggers for this functionality. It's very similar to middleware, but with a few changes:

* FlowRouter triggers can't block the routing process. They just trigger there is a route change.
* Triggers can't rerun the routing process due to a reactive change (there is no reactive context inside triggers).

However, triggers can redirect the app to another route. You can add triggers globally or for individual routes.

Let's have a look at some common ways to use triggers.

## Using Triggers to Notify Google Analytics

Let's say we need to notify Google Analytics for every route change in our app. This is how to do it:

~~~js
function notifyGoogleAnalytics(context) {
    ga('send', 'pageview', context.path);
}

FlowRouter.triggers.enter([notifyGoogleAnalytics]);
~~~

## Old Route Redirection

Let's say we've an old route and we need to redirect users to a new route. This is how to do it:

~~~js
FlowRouter.route('/old-route/:pageId', {
    name: 'old-route',
    triggersEnter: [function(context, redirect) {
        var newRouteName = 'new-route';
        var params = context.params;
        redirect(newRouteName, params);
    }]
});

FlowRouter.route('/new-route/:pageId', {
    name: 'new-route',
    action: function() {
        console.log("This is our new route!");
    }
});
~~~

In the above example, all requests to the `old-route` are redirected to the `new-route`.

> Do not implement auth logic inside triggers and redirects. It won't work and we don't recommend it. Use the template-level auth management as we described in the section above.

## Implementing Page Position History for the Back Button

Normally in browsers, if we hit the back button we will move to the previous page and the position on that page as well. When you are using FlowRouter, there is no page position maintaining functionality, so you need to implement it manually.

Also, with FlowRouter when you switch between routes, the scroll position won't change at all. This is a problem and here's how we fixed it using triggers.

In the following example, we'll use both exit and enter triggers. We also assume you are using SubsManager in your app. Otherwise, when you hit the back button, there won't be data available to render the page immediately.

> Exit trigger is fired whenever you try to change the route. But it has the context of the current route and called before triggers or actions of the next route.

~~~js
// we only need to keep history for two paths at once
// first path is what we need to check always
var previousPaths = [null, null];

function saveScrollPosition(context) {
  var pathInfo = {
    path: context.path,
    scrollPosition: $('body').scrollTop()
  };

  // add a new path and remove the first path
  // using as a queue
  this._previousPaths.push(pathInfo);
  this._previousPaths.shift();
}

function jumpToPrevScrollPosition(context) {
  var path = context.path;
  var scrollPosition = 0;
  var prevPathInfo = previousPaths[0];
  if(prevPathInfo && prevPathInfo.path === context.path) {
    scrollPosition = prevPathInfo.scrollPosition;
  }
  
  if(scrollPosition === 0) {
    // we can scroll right away since we don't need to wait for rendering
    $('body').animate({scrollTop: scrollPosition}, 0);
  } else {
    // Now we need to wait a bit for blaze/react does rendering.
    // We assume, there's subs-manager and we've previous page's data.
    // Here 10 millis deley is a arbitary value with some testing.
    setTimeout(function () {
      $('body').animate({scrollTop: scrollPosition}, 0);
    }, 10);
  }
}

FlowRouter.triggers.exit([saveScrollPosition]);
FlowRouter.triggers.enter([jumpToPrevScrollPosition]);
~~~

