---
navTitle: Subscriptions and Data Management
navSubTitle: 
title: Subscriptions and Data Management
enableComments: true
---

One of the essential parts of a Meteor app is data and subscription management. In the past, we invoked subscriptions in the router itself and manage data inside it. However, now we consider that to be an **anti-pattern**.

## Why?

> In the client side, we've no control on when data will be available for the app. You need to wait for subscription to send the data.

* Router needs to wait for data and it needs to be reactive. This leads to a lot of unpredictable behavior specially when your app became larger.
* While data are loading, we may need to show loading messages. So we would need to find ways to interact with the router and the rendering layers. Showing a global loader is not a good pattern.
* Now, wherever you reuse the template, you need to define data requirement for that in the router again.

[See some related discussion on this topic](https://forums.meteor.com/t/flowrouter-2-0-the-meteor-routing-guide/7699/11?u=arunoda)

Moving subscription management to the **template/component** layer is the correct way. Then we've the flexibility to show and hide views based on the state of the subscription. We can also re-use templates in different places and we don't need to define how to pass data into them.

For Blaze, we can use template-level subscriptions. For React, we can directly use subscriptions. We can also use [SubsManager](https://github.com/meteorhacks/subs-manager) to improve subscription performance. We'll discuss all of these in this section.

> FlowRouter 1.x comes with its own subscription registration API. It's much better than managing subscriptions at the router level. Anyway, we are removing it in 3.x. 
> 
> We don't remove it in 2.x because it's the one of the easiest way to enable [FastRender](https://github.com/meteorhacks/fast-render) for Blaze.